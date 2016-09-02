import types from 'orm/types'

const {
  TEXT,
  DATE,
  NAME,
  CHAR1,
  CHAR2,
  CHAR8,
  EMAIL,
  PHONE,
  STRING,
  SELECT,
  CPFCNPJ,
  DATETIME
} = types

export const breakLine = `
`
export const blankLine = `${breakLine}${breakLine}`

export const stringTypes = [
  TEXT,
  NAME,
  DATE,
  CHAR1,
  CHAR2,
  CHAR8,
  EMAIL,
  PHONE,
  STRING,
  SELECT,
  CPFCNPJ,
  DATETIME
]

export const columnIsString = (typing) => {
  let type
  if (typeof typing === 'string') type = typing
  if (typeof typing === 'object') type = typing.type
  return stringTypes.indexOf(type) > -1
}

export const getListReturning = ({fields}) => Object.keys(fields).join(', ')

export const getListFields = ({fields, data}) => {
  return Object.keys(fields).filter((field) => {
    return data.hasOwnProperty(field) && data[field] !== undefined
  })
}

export const forceString = (str) => `'${String(str).replace('\'', '\\\'').replace('"', '\\"')}'`

export const fieldIsString = (select, fieldName) => Boolean(select.find(({field, type}) => {
  if (fieldName !== field) return false
  return stringTypes.indexOf(type) > -1
}))

export const objToListFields = ({fields}) => Object.keys(fields).map((field) => {
  const typing = fields[field]
  let type
  if (typeof typing === 'string') type = typing
  if (typeof typing === 'object') type = typing.type

  return {type, field}
})

const comparators = {
  eq: '=',   // equal
  lt: '<',   // less than
  gt: '>',   // greater than
  lq: '<=',  // less or equal
  gq: '>=',  // greater or equal
  df: '<>',  // diference
  lk: 'like' // = like by argument
}

const getComparatorValueCondition = (conditions, condField) => {
  let value = conditions[condField]
  let comparator
  const partsValue = value.split(':')
  if (partsValue.length === 2) {
    const comp = String(partsValue[0]).toLowerCase().trim()
    if (comparators.hasOwnProperty(comp)) {
      value = String(partsValue[1]).trim()
      comparator = comparators[comp]
      if (comparator === 'like') value = `%${value}%`
    }
  }

  if (!comparator) comparator = '='
  return {value, comparator}
}

const getFieldTableCondition = (condField) => {
  let table
  let field = condField
  const partsField = condField.split('.')
  if (partsField.length === 2) {
    table = String(partsField[0]).trim()
    field = String(partsField[1]).trim()
  }

  return {field, table}
}

export const condToWhereList = (conditions, whereList = []) => {
  const getComparatorValue = getComparatorValueCondition.bind(this, conditions)

  Object.keys(conditions).forEach((condField) => {
    const {field, table} = getFieldTableCondition(condField)
    const {value, comparator} = getComparatorValue(condField)
    whereList.push({field, comparator, value, table})
  })

  return whereList
}
