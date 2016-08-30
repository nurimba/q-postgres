import {objToListFields, fieldIsString} from './sqlUtils'

const getListFields = ({data}) => Object.keys(data).filter(filterData.bind(this, data)).join(', ')
const getListReturning = ({fields}) => Object.keys(fields).join(', ')

const filterData = (data, field) => {
  const value = data[field]
  return value !== undefined && value !== null
}

const getListValues = ({fields, data}) => {
  const selectFields = objToListFields({fields})
  return Object.keys(data).filter(filterData.bind(this, data)).map((field) => {
    const value = data[field]
    const isString = fieldIsString(selectFields, field)
    return isString ? `'${String(value).replace('\'', '\\\'')}'` : value
  }).join(', ')
}

const toSQL = ({table, listFields, listValues, listReturning}) => `
INSERT INTO ${table} (${listFields})
       VALUES (${listValues})
       RETURNING ${listReturning};
`.trim()

export default ({table, fields, data}) => {
  const listFields = getListFields({data})
  const listValues = getListValues({fields, data})
  const listReturning = getListReturning({fields})
  return toSQL({table, listFields, listValues, listReturning})
}
