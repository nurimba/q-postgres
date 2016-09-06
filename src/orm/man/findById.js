import execute from 'orm/man/execute'
import sqlSelect from 'orm/sql/sqlSelect'
import {objToListFields} from 'orm/sql/sqlUtils'

export default async (schema, connection, value) => {
  const select = objToListFields(schema)
  const where = [{field: 'id', comparator: '=', value}]
  const sql = sqlSelect(Object.assign({}, schema, {select, where}))
  if (process.env.PG_DEBUG === true || process.env.PG_DEBUG === 'FIND') console.log(sql)
  const rows = await execute(schema, connection, sql)
  return rows.pop()
}
