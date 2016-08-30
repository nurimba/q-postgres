import execute from './execute'
import sqlSelect from '../sql/sqlSelect'
import {objToListFields} from '../sql/sqlUtils'

export default async (schema, connection, value) => {
  const select = objToListFields(schema)
  const where = [{field: 'id', comparator: '=', value}]
  const sql = sqlSelect(Object.assign({}, schema, {select, where}))
  const rows = await execute(schema, connection, sql)
  return rows.pop()
}
