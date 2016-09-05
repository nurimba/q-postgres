import sqlWhere from 'orm/sql/sqlWhere'
import {breakLine, blankLine} from 'orm/sql/sqlUtils'

const toSQL = ({table, selectFields, conditional, limitRows, orderFields, joinTables, groupFields}) => {
  let sql = `
SELECT ${selectFields}
FROM ${table}
${joinTables}
${conditional}
${groupFields}
${orderFields}
${limitRows}
`
  while (sql.indexOf(blankLine) !== -1) sql = sql.replace(blankLine, breakLine)
  return sql.trim()
}

const pagination = ({limit, page}) => {
  if (!limit) return ''
  if (!page) return `LIMIT ${limit}`
  const offset = (page - 1) * limit
  if (!offset) return `LIMIT ${limit}`
  return `LIMIT ${limit} OFFSET ${offset}`
}

const mapOrder = (select, table, count, seq) => {
  const {field, order} = seq
  const tableName = seq.table || table

  const fieldSelect = select ? select.find(fd => {
    const fieldTable = fd.table || table
    return fd.field === field && fieldTable === tableName
  }) : undefined

  if (!fieldSelect) return `${tableName}.${field} ${order || ''}`.trim()

  let posField = select.indexOf(fieldSelect) + 1
  if (count) posField++
  return `${posField} ${order || ''}`.trim()
}

const orderByFields = ({table, select, orderBy, count}) => {
  if (!select) return ''
  if (!orderBy) return ''

  const mapOrderBy = mapOrder.bind(this, select, table, count)
  const sequence = orderBy.map(mapOrderBy).join(', ')
  return sequence ? `ORDER BY ${sequence}` : ''
}

const joinReferences = ({joins}) => {
  if (!joins) return ''

  return joins.map((join) => {
    const isString = typeof join === 'string'
    if (isString) return join
    const {tableRef, fieldRef, tableLink, fieldLink} = join
    return `JOIN ${tableRef} ON (${tableRef}.${fieldRef} = ${tableLink}.${fieldLink})`
  }).join(breakLine)
}

const filterSelect = ({grouping}, {show, func}) => {
  if (grouping && func) return false
  return (show === undefined || Boolean(show))
}

const mountFieldName = (table, field, func) => {
  const fieldName = field[0].toUpperCase().concat(field.substring(1, field.length))
  if (func) return `${func}(${table}.${field}) AS ${func.toLowerCase()}${fieldName}`
  return `${table}.${field}`
}

const mountFieldNameAlias = (table, field, func) => {
  const fieldName = field[0].toUpperCase().concat(field.substring(1, field.length))
  if (func) {
    const tableName = table[0].toUpperCase().concat(table.substring(1, table.length))
    return `${func}(${table}.${field}) AS ${func.toLowerCase()}${tableName}${fieldName}`
  }
  return `${table}.${field} AS ${table}${fieldName}`
}

const prepareSelect = (schema) => {
  const {select} = schema
  if (!select) return []
  return select.filter(filterSelect.bind(this, schema)).map((conf) => {
    const {table, grouping} = schema
    const {field, func} = conf
    const tableName = conf.table || table
    if (grouping) return `${tableName}.${field}`
    if (tableName === table) return mountFieldName(tableName, field, func)
    return mountFieldNameAlias(tableName, field, func)
  })
}

const selFields = ({table, select, count, distinct}) => {
  if (distinct && count) distinct = false
  const fields = prepareSelect({select, table}).join(', ')
  return count
    ? `COUNT(-1) AS _counter${fields ? ', '.concat(fields) : ''}`
    : (distinct ? `DISTINCT ${fields}` : fields)
}

const groupBy = ({select, table, count}) => {
  if (!select) return ''
  const grouping = true
  const fields = prepareSelect({select, table, grouping}).join(', ')
  const withFunc = Boolean(select && select.find(({func}) => Boolean(func)))
  const withGroupBy = (count || withFunc) && fields
  if (withGroupBy) return `GROUP BY ${fields}`
  return ''
}

export default (schema) => {
  const selectFields = selFields(schema)
  const orderFields = orderByFields(schema)
  const joinTables = joinReferences(schema)
  const conditional = sqlWhere(schema)
  const limitRows = pagination(schema)
  const groupFields = groupBy(schema)
  return toSQL(Object.assign({selectFields, conditional, limitRows, orderFields, joinTables, groupFields}, schema))
}
