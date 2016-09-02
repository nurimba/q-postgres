import types from 'orm/types'

const {
  DATE,
  BOOLEAN
} = types

const getTyping = (typing) => {
  if (typeof typing === 'object') return typing.type
  return typing
}

const formatDate = (value) => {
  const dt = new Date(value)
  const day = `0${dt.getDate()}`.substr(-2)
  const mon = `0${dt.getMonth() + 1}`.substr(-2)
  return `${dt.getFullYear()}-${mon}-${day}`
}

const formatRow = async ({fields, count}, row) => {
  let newRow = {}
  if (count) {
    newRow['_counter'] = parseInt(row._counter || 0, 10)
    if (Object.keys(row).length === 1) return newRow
  }

  Object.keys(fields).forEach((field) => {
    let value = row[field] || row[field.toLowerCase()]
    newRow[field] = value
    const typing = getTyping(fields[field])
    if (typing === BOOLEAN) newRow[field] = Boolean(value)
    if (value === null) return
    if (value === undefined) return
    if (typing === DATE) newRow[field] = formatDate(value)
  })

  return newRow
}

export default async (schema, {execute}, sql) => {
  const {rows} = await execute(sql)
  return Promise.all(rows.map(formatRow.bind(this, schema)))
}
