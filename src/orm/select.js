import {selectTable} from 'gen'
import objRow from 'orm/objRow'

export default (connection, schema, ...fields) => {
  if (!fields || !fields.length) fields = Object.keys(schema.fields)
  let selectCommand = selectTable()
  selectCommand.from(schema.table)
  fields.forEach(field => selectCommand.field(field))

  selectCommand.run = async () => {
    const whereConditions = selectCommand.values
    const selectSQL = selectCommand.toSQL()
    const res = await connection.execute(selectSQL, whereConditions)
    if (res.rows && res.rows.length) res.rows = res.rows.map(objRow.bind(this, schema))
    return res
  }

  return selectCommand
}
