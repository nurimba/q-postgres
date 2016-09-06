import execute from 'orm/man/execute'
import sqlSelect from 'orm/sql/sqlSelect'
import {condToWhereList, objToListFields} from 'orm/sql/sqlUtils'

export default async (schema, connection, conditions) => {
  const where = condToWhereList(conditions)
  const select = objToListFields(schema)
  const sql = sqlSelect(Object.assign({}, schema, {select, where}))
  if (process.env.PG_DEBUG === true || process.env.PG_DEBUG === 'FIND') console.log(sql)
  return execute(schema, connection, sql)
}
