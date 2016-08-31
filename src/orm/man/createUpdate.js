import execute from './execute'
import sqlInsert from '../sql/sqlInsert'
import sqlUpdate from '../sql/sqlUpdate'
import findByQuery from './findByQuery'
import types from '../types'

const {PRIMARY} = types

const saveReference = async (id, schema, connection, data) => {
  return id
    ? updateRowById(schema, connection, id, data)
    : insertRow(schema, connection, data)
}

const persistHasMany = async ({schema, connection, data, rowParent}) => {
  const {hasMany} = schema
  const references = {}
  if (!hasMany) return references

  await Promise.all(Object.keys(hasMany).map(async (field) => {
    const fieldReference = hasMany[field].field
    const schemaReference = hasMany[field].schema
    const rows = data[field] || []

    references[field] = await Promise.all(rows.map(async (row) => {
      const {id} = row
      const reference = Object.assign({}, row, {[fieldReference]: rowParent.id})
      return saveReference(id, schemaReference, connection, reference)
    }))
  }))

  return references
}

const persistManyToMany = async ({schema, connection, data, rowParent}) => {
  const {manyToMany} = schema
  const references = {}
  if (!manyToMany) return references

  await Promise.all(Object.keys(manyToMany).map(async (field) => {
    const {extraFields, parent, table, reference} = manyToMany[field]
    const schemaReference = manyToMany[field].schema
    const rows = data[field] || []

    references[field] = await Promise.all(rows.map(async (row) => {
      let extraData = {}
      Object.keys(extraFields).forEach((field) => {
        extraData[field] = row[field]
        delete row[field]
      })

      const {id} = row
      const rowSaved = await saveReference(id, schemaReference, connection, row)

      const manySchema = {
        table,

        fields: Object.assign({
          id: PRIMARY,
          [parent]: PRIMARY,
          [reference]: PRIMARY
        }, extraFields)
      }

      const manyWhere = {
        [parent]: `eq:${rowParent.id}`,
        [reference]: `eq:${rowSaved.id}`
      }

      const rows = await findByQuery(manySchema, connection, manyWhere)
      const manyRow = rows.pop()
      const manyId = manyRow ? manyRow.id : undefined
      const manyData = Object.assign({
        id: manyId,
        [parent]: rowParent.id,
        [reference]: rowSaved.id
      }, extraData)

      await saveReference(manyId, manySchema, connection, manyData)
      return Object.assign({}, rowSaved, extraData)
    }))
  }))

  return references
}

const persistReferences = async (refParams) => {
  const hasManyReferences = await persistHasMany(refParams)
  const manyToManyReferences = await persistManyToMany(refParams)
  return Object.assign({}, hasManyReferences, manyToManyReferences)
}

export const insertRow = async (schema, connection, dataCreate) => {
  const data = {...dataCreate}
  const sql = sqlInsert(Object.assign({}, schema, {data}))
  const rows = await execute(schema, connection, sql)
  const rowInserted = rows.pop()
  const references = await persistReferences({schema, connection, data, rowParent: rowInserted})
  return Object.assign(rowInserted, references)
}

export const updateRowById = async (schema, connection, id, data) => {
  const where = [{field: 'id', comparator: '=', value: id}]
  const sql = sqlUpdate(Object.assign({}, schema, {data, where}))
  const rows = await execute(schema, connection, sql)
  const rowUpdated = rows.pop()
  const references = await persistReferences({schema, connection, data, rowParent: rowUpdated})
  return Object.assign(rowUpdated, references)
}
