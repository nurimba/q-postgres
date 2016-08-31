import sqlWhere from './sqlWhere'
import {objToListFields, breakLine, fieldIsString} from './sqlUtils'

const getListReturning = ({fields}) => Object.keys(fields).join(', ')

const filterData = (data, field) => {
  const value = data[field]
  return value !== undefined
}

const getListValues = ({select, data}) => Object.keys(data).filter(filterData.bind(this, data)).map((field) => {
  const value = data[field]
  if (value === null) return `${field} = null`
  const isString = fieldIsString(select, field)
  return isString ? `${field} = '${String(value).replace('\'', '\\\'').replace('"', '\\"')}'` : `${field} = ${value}`
}).join(`,${breakLine}      `)

const toSQL = ({table, setters, conditional, listReturning}) => `
UPDATE ${table}
  SET ${setters}
  ${conditional}
  RETURNING ${listReturning};
`.trim()

export default ({table, fields, data, where}) => {
  const select = objToListFields({fields})
  const setters = getListValues({select, data})
  const listReturning = getListReturning({fields})
  const conditional = sqlWhere({select, where, table})
  return toSQL({table, setters, conditional, listReturning})
}
