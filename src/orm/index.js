import findById from 'orm/man/findById'
import deleteById from 'orm/man/deleteById'
import findByQuery from 'orm/man/findByQuery'
import countByQuery from 'orm/man/countByQuery'
import {getFieldsTypes} from 'orm/sql/sqlUtils'
import {insertRow, updateRowById} from 'orm/man/createUpdate'

const joinORM = (orm, ref) => {
  orm.joins.push(ref)
  return orm
}

const getORM = (schema, db) => {
  const orm = {
    joins: [],
    create: insertRow.bind(this, schema, db),
    findById: findById.bind(this, schema, db),
    deleteById: deleteById.bind(this, schema, db),
    updateById: updateRowById.bind(this, schema, db),
    findByQuery: (query) => findByQuery(Object.assign({}, schema, {joins: orm.joins}), db, query),
    countByQuery: (query) => countByQuery(Object.assign({}, schema, {joins: orm.joins}), db, query)
  }

  orm.join = joinORM.bind(this, orm)
  return orm
}

export default (schema) => (connection) => {
  const fieldsTypes = getFieldsTypes(schema)
  const schemaTypes = Object.assign({fieldsTypes}, schema)
  return getORM(schemaTypes, connection)
}
