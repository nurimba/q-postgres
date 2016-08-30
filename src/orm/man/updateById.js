import execute from './execute'
import sqlUpdate from '../sql/sqlUpdate'

export default async (schema, connection, value, data) => {
  const where = [{field: 'id', comparator: '=', value}]
  const sql = sqlUpdate(Object.assign({}, schema, {data, where}))
  const rows = await execute(schema, connection, sql)
  return rows.pop()
}
