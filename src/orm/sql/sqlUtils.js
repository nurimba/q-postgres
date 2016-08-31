import types from '../types'

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
