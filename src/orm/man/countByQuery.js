import execute from 'orm/man/execute'
import sqlSelect from 'orm/sql/sqlSelect'
import {condToWhereList, objToListFields} from 'orm/sql/sqlUtils'

export default async (schema, connection, conditions) => {
  const where = condToWhereList(conditions)

  const select = objToListFields(schema).map(sel => {
    sel.show = false
    return sel
  })

  const countSchema = Object.assign({}, schema, {select, where, count: true})
  const sql = sqlSelect(countSchema)
  const rows = await execute(countSchema, connection, sql)
  const row = rows.pop()
  if (!row) return 0
  return row._counter || 0
}
