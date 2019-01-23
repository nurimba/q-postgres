import comWhere from 'gen/comparatorWhere'

const breakline = `
`

const orderBy = (orm, field, order) => {
  if (!order) order = ''
  orm.order.push(`${field} ${order.toUpperCase()}`.trim())
  return orm
}

const field = (orm, field) => {
  orm.fields.push(field)
  return orm
}

const groupBy = (orm, field) => {
  orm.group.push(field)
  return orm
}

const join = (orm, joinString) => {
  orm.joins.push(joinString)
  return orm
}

const fromTable = (orm, tableName) => Object.assign(orm, { tableName })
const limit = (orm, limitRows) => Object.assign(orm, { limitRows })
const skip = (orm, skipRows) => Object.assign(orm, { skipRows })

const condToStr = (conditions, values) => {
  return Object.keys(conditions).map((field) => {
    const fieldVal = conditions[field]
    if (field.toLowerCase() === '$or') return `(${condToStr(fieldVal, values).join(') OR (')})`
    if (field.toLowerCase() === '$and') return `(${condToStr(fieldVal, values).join(') AND (')})`

    if (Array.isArray(fieldVal)) {
      let condAr = []

      fieldVal.forEach((val) => {
        if (typeof val === 'object') return (condAr = condAr.concat(condToStr(val, values)))
        condAr.push(toCond(field, val, values))
      })

      return `(${condAr.join(') OR (')})`
    }

    return toCond(field, fieldVal, values)
  })
}

const toCond = (fieldName, fieldValue, values) => {
  const { comparator, value } = comWhere(fieldValue)
  if (value === null && comparator === '=') return `${fieldName} is null`
  values.push(value)
  return `${fieldName} ${comparator} $${values.length}`
}

const where = (orm, conditions) => {
  if (!conditions) conditions = {}
  if (!orm.conditions) orm.conditions = []
  orm.conditions = orm.conditions.concat(condToStr(conditions, orm.values))
  return orm
}

const value = (orm, value) => {
  if (!orm.values) orm.values = []
  orm.values.push(value)
  return orm
}

const setValues = (orm, values) => {
  if (!values) values = []
  if (!orm.values) orm.values = []
  orm.values = values
  return orm
}

const toSQL = ({ tableName, fields, order, group, conditions, limitRows, skipRows, joins }) => {
  const skip = skipRows ? `${breakline}OFFSET ${skipRows}` : ''
  const limit = limitRows ? `${breakline}LIMIT ${limitRows}` : ''
  const orderBy = order && order.length ? `${breakline}ORDER BY ${order.join(', ')}` : ''
  const groupBy = group && group.length ? `${breakline}GROUP BY ${group.join(', ')}` : ''
  const sqlWhere = conditions && conditions.length ? `${breakline}WHERE (${conditions.join(`)${breakline}  AND (`)})` : ''
  const allJoins = joins && joins.length ? `${breakline}${joins.join(breakline)}` : ''

  return `
SELECT ${fields.join(', ')}
FROM ${tableName}${allJoins}${sqlWhere}${groupBy}${orderBy}${limit}${skip}
  `.trim()
}

export default () => {
  const orm = { tableName: '', fields: [], order: [], group: [], values: [], joins: [] }
  orm.from = fromTable.bind(this, orm)
  orm.join = join.bind(this, orm)
  orm.skip = skip.bind(this, orm)
  orm.limit = limit.bind(this, orm)
  orm.field = field.bind(this, orm)
  orm.toSQL = toSQL.bind(this, orm)
  orm.where = where.bind(this, orm)
  orm.value = value.bind(this, orm)
  orm.orderBy = orderBy.bind(this, orm)
  orm.groupBy = groupBy.bind(this, orm)
  orm.setValues = setValues.bind(this, orm)
  return orm
}
