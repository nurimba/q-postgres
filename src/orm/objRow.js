import {DATE} from 'gen/types'

export const formatDate = (value) => {
  if (!value || !String(value).trim()) return null
  const dt = new Date(value)
  const day = `0${dt.getDate()}`.substr(-2)
  const mon = `0${dt.getMonth() + 1}`.substr(-2)
  return `${dt.getFullYear()}-${mon}-${day}`
}

export default (schema, row) => {
  const data = {}

  Object.keys(schema.fields).forEach(field => {
    let value = row[field.toLowerCase()]
    if (schema.fields[field] === DATE) value = formatDate(value)
    Object.assign(data, {[field]: value})
  })

  return data
}
