import comWhere from 'gen/comparatorWhere'

const breakline = `
`

const field = (orm, field) => {
  orm.fields.push(field)
  return orm
}

const orderBy = (orm, field, order) => {
  if (!order) order = ''
  orm.order.push(`${field} ${order.toUpperCase()}`.trim())
  return orm
}

const groupBy = (orm, field) => {
  orm.group.push(field)
  return orm
}

const fromTable = (orm, tableName) => {
  orm.tableName = tableName
  return orm
}

const limit = (orm, limitRows) => {
  orm.limitRows = limitRows
  return orm
}

const where = (orm, conditions) => {
  orm.conditions = Object.keys(conditions || {}).map((field, index) => {
    const {comparator, value} = comWhere(conditions[field])
    orm.values.push(value)
    return `${field} ${comparator} $${index + 1}`
  })

  return orm
}

const toSQL = ({tableName, fields, order, group, conditions, limitRows}) => {
  const limit = limitRows ? `${breakline}LIMIT ${limitRows}` : ''
  const orderBy = order && order.length ? `${breakline}ORDER BY ${order.join(', ')}` : ''
  const groupBy = group && group.length ? `${breakline}GROUP BY ${group.join(', ')}` : ''
  const sqlWhere = conditions && conditions.length ? `${breakline}WHERE (${conditions.join(`)${breakline}  AND (`)})` : ''

  return `
SELECT ${fields.join(', ')}
FROM ${tableName}${sqlWhere}${groupBy}${orderBy}${limit}
  `.trim()
}

export default () => {
  const orm = {tableName: '', fields: [], order: [], group: [], values: []}
  orm.from = fromTable.bind(this, orm)
  orm.field = field.bind(this, orm)
  orm.toSQL = toSQL.bind(this, orm)
  orm.where = where.bind(this, orm)
  orm.limit = limit.bind(this, orm)
  orm.orderBy = orderBy.bind(this, orm)
  orm.groupBy = groupBy.bind(this, orm)
  return orm
}
