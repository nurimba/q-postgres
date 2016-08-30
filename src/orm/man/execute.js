export default async ({fields}, {execute}, sql) => {
  const {rows} = await execute(sql)

  return await Promise.all(rows.map(async (row) => {
    let newRow = {}

    Object.keys(fields).forEach((field) => {
      let value = row[field]
      const {type} = fields[field]

      if (type === Date) {
        const dt = new Date(value)
        const day = `0${dt.getDate()}`.substring(-2)
        const mon = `0${dt.getMonth() + 1}`.substring(-2)
        value = value ? `${dt.getFullYear()}-${mon}-${day}` : null
      }

      if (type === String) value = String(value || '')
      if (type === Boolean) value = Boolean(value)
      Object.assign(newRow, {[field]: value})
    })

    return newRow
  }))
}
