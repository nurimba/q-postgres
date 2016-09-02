import sqlWhere from 'orm/sql/sqlWhere'
import {objToListFields} from 'orm/sql/sqlUtils'

const toSQL = ({table, conditional}) => `
DELETE FROM ${table}
${conditional};
`.trim()

export default (schema) => {
  const {table, fields} = schema
  const schemaWithSelect = Object.assign({}, schema, {select: objToListFields({fields})})
  const conditional = sqlWhere(schemaWithSelect)
  return toSQL({table, conditional})
}
