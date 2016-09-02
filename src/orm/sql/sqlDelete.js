import sqlWhere from 'orm/sql/sqlWhere'
import {objToListFields} from 'orm/sql/sqlUtils'

const toSQL = ({table, conditional}) => `
DELETE FROM ${table}
${conditional};
`.trim()

export default ({table, fields, where}) => {
  const select = objToListFields({fields})
  const conditional = sqlWhere({select, where, table})
  return toSQL({table, conditional})
}
