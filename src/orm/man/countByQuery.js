import execute from 'orm/man/execute'
import sqlSelect from 'orm/sql/sqlSelect'
import {condToWhereList} from 'orm/sql/sqlUtils'

export default async (schema, connection, conditions) => {
  const where = condToWhereList(conditions)
  const sql = sqlSelect(Object.assign({}, schema, {where, count: true}))
  const {rows} = await execute(schema, connection, sql)
  return rows.pop()._counter
}
