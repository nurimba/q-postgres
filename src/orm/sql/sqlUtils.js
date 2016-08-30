export const breakLine = `
`
export const blankLine = `${breakLine}${breakLine}`

export const fieldIsString = (select, fieldName) => Boolean(select.find(({field, type}) => {
  if (fieldName !== field) return false
  return Boolean(type === String || type === Date)
}))

export const objToListFields = ({fields}) => Object.keys(fields).map((field) => {
  const {type} = fields[field]
  return {type, field}
})
