import types from '../types'

const {
  DATE,
  BOOLEAN
} = types

export default async ({fields}, {execute}, sql) => {
  const {rows} = await execute(sql)

  return await Promise.all(rows.map(async (row) => {
    let newRow = {}

    Object.keys(fields).forEach((field) => {
      let value = row[field] || row[field.toLowerCase()]
      newRow[field] = value

      let type
      const typing = fields[field]
      if (typeof typing === 'string') type = typing
      if (typeof typing === 'object') type = typing.type
      if (type === BOOLEAN) newRow[field] = Boolean(value)

      if (value === null) return
      if (value === undefined) return

      if (type === DATE) {
        const dt = new Date(value)
        const day = `0${dt.getDate()}`.substr(-2)
        const mon = `0${dt.getMonth() + 1}`.substr(-2)
        newRow[field] = `${dt.getFullYear()}-${mon}-${day}`
      }
    })

    return newRow
  }))
}
