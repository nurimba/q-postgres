import execute from './execute'
import sqlInsert from '../sql/sqlInsert'

export default async (schema, connection, dataCreate) => {
  const data = {...dataCreate}
  const sql = sqlInsert(Object.assign({}, schema, {data}))
  const rows = await execute(schema, connection, sql)
  return rows.pop()
}
