import findById from 'orm/man/findById'
import deleteById from 'orm/man/deleteById'
import findByQuery from 'orm/man/findByQuery'
import countByQuery from 'orm/man/countByQuery'
import {insertRow, updateRowById} from 'orm/man/createUpdate'

export default (schema) => (connection) => {
  const orm = {
    joins: [],
    create: insertRow.bind(this, schema, connection),
    findById: findById.bind(this, schema, connection),
    deleteById: deleteById.bind(this, schema, connection),
    updateById: updateRowById.bind(this, schema, connection),
    findByQuery: (query) => findByQuery(Object.assign({}, schema, {joins: orm.joins}), connection, query),
    countByQuery: (query) => countByQuery(Object.assign({}, schema, {joins: orm.joins}), connection, query),
    join: (ref) => {
      orm.joins.push(ref)
      return orm
    }
  }

  return orm
}
