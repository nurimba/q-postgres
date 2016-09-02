import execute from 'orm/man/execute'
import sqlDelete from 'orm/sql/sqlDelete'

export default async (schema, connection, value) => {
  const where = [{field: 'id', comparator: '=', value}]
  const sql = sqlDelete(Object.assign({}, schema, {where}))
  return execute(schema, connection, sql)
}
