import findById from 'orm/man/findById'
import deleteById from 'orm/man/deleteById'
import findByQuery from 'orm/man/findByQuery'
import countByQuery from 'orm/man/countByQuery'
import {getFieldsTypes} from 'orm/sql/sqlUtils'
import {insertRow, updateRowById} from 'orm/man/createUpdate'

const joinORM = (orm, schema, ref) => {
  schema.joins.push(ref)
  return orm
}

const addSelect = (orm, schema, sel) => {
  schema.select.push(sel)
  return orm
}

const getORM = (schema, db) => {
  const orm = {
    create: insertRow.bind(this, schema, db),
    findById: findById.bind(this, schema, db),
    deleteById: deleteById.bind(this, schema, db),
    updateById: updateRowById.bind(this, schema, db),
    findByQuery: findByQuery.bind(this, schema, db),
    countByQuery: countByQuery.bind(this, schema, db)
  }

  orm.join = joinORM.bind(this, orm, schema)
  orm.addSelect = addSelect.bind(this, orm, schema)
  return orm
}

const getModel = (schema, connection) => {
  const schemaModel = {...schema}
  if (!schemaModel.joins) schemaModel.joins = []
  if (!schemaModel.select) schemaModel.select = []
  return getORM(schemaModel, connection)
}

export default (schema) => {
  const fieldsTypes = getFieldsTypes(schema)
  const schemaTypes = Object.assign({fieldsTypes}, schema)
  return getModel.bind(this, schemaTypes)
}
