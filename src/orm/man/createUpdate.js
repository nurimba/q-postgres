import execute from 'orm/man/execute'
import sqlInsert from 'orm/sql/sqlInsert'
import sqlUpdate from 'orm/sql/sqlUpdate'
import findByQuery from 'orm/man/findByQuery'
import types from 'orm/types'

const {PRIMARY} = types

const saveReference = (id, schema, connection, data) => {
  return id
    ? updateRowById(schema, connection, id, data)
    : insertRow(schema, connection, data)
}

const saveHasMany = (hasManyField, connection, rowParent, row) => {
  const {id} = row
  const {field, schema} = hasManyField
  const reference = Object.assign({}, row, {[field]: rowParent.id})
  return saveReference(id, schema, connection, reference)
}

const persistHasMany = async ({schema, connection, data, rowParent}) => {
  const {hasMany} = schema
  const references = {}
  if (!hasMany) return references

  await Promise.all(Object.keys(hasMany).map(async (field) => {
    const rows = data[field] || []
    const hasManyField = hasMany[field]
    const saveHasManyRow = saveHasMany.bind(this, hasManyField, connection, rowParent)
    references[field] = await Promise.all(rows.map(saveHasManyRow))
  }))

  return references
}

const getExtraData = ({extraFields, row}) => {
  let extraData = {}

  Object.keys(extraFields).forEach((field) => {
    extraData[field] = row[field]
    delete row[field]
  })

  return extraData
}

const mountSchemaMany = (manyToManyField) => {
  const {extraFields, parent, table, reference} = manyToManyField
  return {
    table,

    fields: Object.assign({
      id: PRIMARY,
      [parent]: PRIMARY,
      [reference]: PRIMARY
    }, extraFields)
  }
}

const mountManyWhere = ({parent, reference}, rowParent, rowSaved) => ({
  [parent]: `eq:${rowParent.id}`,
  [reference]: `eq:${rowSaved.id}`
})

const mountManyData = ({parent, reference}, extraData, manyId, rowParent, rowSaved) => Object.assign({
  id: manyId,
  [parent]: rowParent.id,
  [reference]: rowSaved.id
}, extraData)

const getManyAttrs = async (manyToManyField, connection, rowParent, rowSaved) => {
  const manySchema = mountSchemaMany(manyToManyField)
  const manyWhere = mountManyWhere(manyToManyField, rowParent, rowSaved)
  const rows = await findByQuery(manySchema, connection, manyWhere)
  const manyRow = rows.pop()
  const manyId = manyRow ? manyRow.id : undefined
  return {manySchema, manyId}
}

const mountManyReferences = async (manyToManyField, connection, rowParent, row) => {
  const {id} = row
  const {schema, extraFields} = manyToManyField
  const extraData = getExtraData({extraFields, row})
  const rowSaved = await saveReference(id, schema, connection, row)
  const {manySchema, manyId} = await getManyAttrs(manyToManyField, connection, rowParent, rowSaved)
  const manyData = mountManyData(manyToManyField, extraData, manyId, rowParent, rowSaved)
  await saveReference(manyId, manySchema, connection, manyData)
  return Object.assign({}, rowSaved, extraData)
}

const persistManyToMany = async ({schema, connection, data, rowParent}) => {
  const {manyToMany} = schema
  const references = {}
  if (!manyToMany) return references

  await Promise.all(Object.keys(manyToMany).map(async (field) => {
    const rows = data[field] || []
    const manyToManyField = manyToMany[field]
    const manyToManySave = mountManyReferences.bind(this, manyToManyField, connection, rowParent)
    references[field] = await Promise.all(rows.map(manyToManySave))
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
