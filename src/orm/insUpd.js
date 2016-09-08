import {insertTable, updateTable} from 'gen'
import selectData from 'orm/select'
import {DATE} from 'gen/types'

export const formatDate = (value) => {
  const dt = new Date(value)
  const day = `0${dt.getDate()}`.substr(-2)
  const mon = `0${dt.getMonth() + 1}`.substr(-2)
  return `${dt.getFullYear()}-${mon}-${day}`
}

export const getObjRow = (schema, row) => {
  const data = {}

  Object.keys(schema.fields).forEach(field => {
    let value = row[field.toLowerCase()]
    if (schema.fields[field] === DATE) value = formatDate(value)
    Object.assign(data, {[field]: value})
  })

  return data
}

const saveManyToMany = async (tables, connection, {manyToMany}, rowSaved, data) => {
  const {id} = rowSaved
  return Promise.all(Object.keys(manyToMany || {}).map(async (manyToManyField) => {
    const manyToManyRows = data[manyToManyField]
    if (!manyToManyRows || !manyToManyRows.length) return
    const {table, primary, secondary, schema, extraFields} = manyToMany[manyToManyField]
    const manyToManySchema = tables[schema]
    rowSaved[manyToManyField] = await Promise.all(manyToManyRows.map((manyToManyRow, index) => {
      let manyToManyData = {...manyToManyRow}
      Object.keys(extraFields).forEach(field => delete manyToManyData[field])
      const manyToManyId = manyToManyData.id
      return manyToManyId
        ? updateData(tables, connection, manyToManySchema, manyToManyData, {id: manyToManyId})
        : insertData(tables, connection, manyToManySchema, manyToManyData)
    }))

    await Promise.all(manyToManyRows.map(async (manyToManyRow, index) => {
      const tableData = {}
      Object.keys(extraFields).forEach(field => (tableData[field] = manyToManyRow[field]))
      const secondaryId = rowSaved[manyToManyField][index].id
      tableData[primary] = id
      tableData[secondary] = secondaryId
      const select = selectData.bind(this, connection, tables[table])
      const {rows} = await select('id')
        .from('kinships')
        .where({[primary]: id, [secondary]: secondaryId})
        .limit(1)
        .run()

      const dataId = rows && rows.length ? rows.shift().id : undefined

      const manyToManySaved = dataId
        ? await updateData(tables, connection, tables[table], tableData, {id: dataId})
        : await insertData(tables, connection, tables[table], tableData)
      Object.keys(extraFields).forEach(field => Object.assign(rowSaved[manyToManyField][index], {[field]: manyToManySaved[field]}))
    }))
  }))
}

const saveHasMany = async (tables, connection, {hasMany}, rowSaved, data) => {
  const {id} = rowSaved
  await Promise.all(Object.keys(hasMany || {}).map(async (hasManyField) => {
    const hasManyRows = data[hasManyField]
    if (!hasManyRows || !hasManyRows.length) return
    const {table, field} = hasMany[hasManyField]
    const hasManySchema = tables[table]

    rowSaved[hasManyField] = await Promise.all(hasManyRows.map((hasManyRow, index) => {
      const hasManyData = {...hasManyRow, [field]: id}
      const hasManyId = hasManyData.id
      return hasManyId
        ? updateData(tables, connection, hasManySchema, hasManyData, {id: hasManyId})
        : insertData(tables, connection, hasManySchema, hasManyData)
    }))
  }))
}

const saveRelations = async (tables, connection, schema, rowSaved, data) => {
  await saveHasMany(tables, connection, schema, rowSaved, data)
  await saveManyToMany(tables, connection, schema, rowSaved, data)
  return rowSaved
}

export const insertData = async (tables, connection, schema, data) => {
  const insertCommand = insertTable(schema).objValues(data)
  const insertValues = insertCommand.values
  const insertSQL = insertCommand.toSQL()
  const {rows} = await connection.execute(insertSQL, insertValues)
  const rowSaved = rows.map(getObjRow.bind(this, schema)).shift()
  return saveRelations(tables, connection, schema, rowSaved, data)
}

export const updateData = async (tables, connection, schema, data, conditions) => {
  const updateCommand = updateTable(schema).objValues(data, conditions)
  const updateValues = updateCommand.values
  const updateSQL = updateCommand.toSQL()
  const {rows} = await connection.execute(updateSQL, updateValues)
  const rowSaved = rows.map(getObjRow.bind(this, schema)).shift()
  return saveRelations(tables, connection, schema, rowSaved, data)
}
