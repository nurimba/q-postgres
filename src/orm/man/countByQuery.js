import execute from 'orm/man/execute'
import sqlSelect from 'orm/sql/sqlSelect'
import {condToWhereList} from 'orm/sql/sqlUtils'

export default async (schema, connection, conditions) => {
  const where = condToWhereList(conditions)
  const countSchema = Object.assign({}, schema, {where, count: true})
  const sql = sqlSelect(countSchema)
  const rows = await execute(countSchema, connection, sql)
  const row = rows.pop()
  if (!row) return 0
  return row._counter || 0
}
