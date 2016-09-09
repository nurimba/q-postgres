import findById from 'orm/findById'
import selectData from 'orm/select'
import deleteData from 'orm/delete'
import {insertData, updateData} from 'orm/insUpd'

const ormModel = (tables, connection, modelName) => {
  const schema = JSON.parse(JSON.stringify(tables[modelName]))
  const model = {schema}
  model.select = selectData.bind(this, connection, schema)
  model.delete = deleteData.bind(this, connection, schema)
  model.insert = insertData.bind(this, tables, connection, schema)
  model.update = updateData.bind(this, tables, connection, schema)
  model.findById = findById.bind(this, tables, connection, schema)
  return model
}

const ormDatabase = (tables, connection) => ormModel.bind(this, tables, connection)

export default (schemas) => {
  const tables = {}
  schemas.forEach((schema) => Object.assign(tables, {[schema.table]: schema}))
  return ormDatabase.bind(this, tables)
}
