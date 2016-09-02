import sqlWhere from 'orm/sql/sqlWhere'
import {forceString, columnIsString, getListReturning, getListFields, breakLine, objToListFields} from 'orm/sql/sqlUtils'

const getListValues = ({fields, data}) => {
  const listFields = getListFields({fields, data})

  return listFields.map((field) => {
    let value = data[field]
    if (value === null) value = 'null'
    if (data[field] !== null && columnIsString(fields[field])) value = forceString(value)
    return `${field} = ${value}`
  }).join(`,${breakLine}      `)
}

const toSQL = ({table, setters, conditional, listReturning}) => `
UPDATE ${table}
  SET ${setters}
  ${conditional}
  RETURNING ${listReturning};
`.trim()

export default (schema) => {
  const select = objToListFields(schema)
  const setters = getListValues(schema)
  const listReturning = getListReturning(schema)
  const conditional = sqlWhere(Object.assign({select}, schema))
  return toSQL(Object.assign({setters, conditional, listReturning}, schema))
}
