import {forceString, columnIsString} from './sqlUtils'

const getListFields = ({fields, data}) => {
  return Object.keys(fields).filter((field) => {
    return data.hasOwnProperty(field) && data[field] !== undefined
  })
}

const getListReturning = ({fields}) => Object.keys(fields).join(', ')

const getListValues = ({fields, data}) => {
  const listFields = getListFields({fields, data})

  const listValues = listFields.map((field) => {
    const value = data[field]
    if (value === null) return 'null'
    const isString = columnIsString(fields[field])
    return isString ? forceString(value) : value
  })

  return {
    listFields: listFields.join(', '),
    listValues: listValues.join(', ')
  }
}

const toSQL = ({table, listFields, listValues, listReturning}) => `
INSERT INTO ${table} (${listFields})
       VALUES (${listValues})
       RETURNING ${listReturning};
`.trim()

export default ({table, fields, data}) => {
  const listReturning = getListReturning({fields})
  const {listValues, listFields} = getListValues({fields, data, listFields})
  return toSQL({table, listFields, listValues, listReturning})
}
