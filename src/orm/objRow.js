import {DATE, MONEY, PERCENT, INTEGER, REFERENCES} from 'gen/types'

export const formatDate = (value) => {
  if (!value || !String(value).trim()) return null
  const dt = new Date(value)
  const day = `0${dt.getDate()}`.substr(-2)
  const mon = `0${dt.getMonth() + 1}`.substr(-2)
  return `${dt.getFullYear()}-${mon}-${day}`
}

export const formatFloat = (value) => {
  if (!value || !String(value).trim()) return null
  return parseFloat(value)
}

export const formatInteger = (value) => {
  if (!value || !String(value).trim()) return null
  return parseInt(value, 10)
}

export default (schema, row) => {
  Object.keys(schema.fields).forEach(field => {
    const fieldLower = String(field || '').toLowerCase()
    const isLower = Boolean(field !== fieldLower)
    const fieldName = isLower ? fieldLower : field
    if (!row.hasOwnProperty(fieldName)) return

    let value = row[fieldName]
    if (schema.fields[field] === DATE) value = formatDate(value)
    if ([MONEY, PERCENT].indexOf(schema.fields[field]) > -1) value = formatFloat(value)
    if ([INTEGER, REFERENCES].indexOf(schema.fields[field]) > -1) value = formatInteger(value)
    row[field] = value
    if (isLower) delete row[fieldName]
  })

  return row
}
