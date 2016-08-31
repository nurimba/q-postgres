import sqlWhere from './sqlWhere'
import {breakLine, blankLine} from './sqlUtils'

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

const orderByFields = ({table, select, orderBy, count}) => {
  if (!orderBy) return ''

  const sequence = orderBy.map((seq) => {
    const {field, order} = seq
    const tableName = seq.table || table

    const fieldSelect = select.find(fd => {
      const fieldName = fd.field
      const fieldTable = fd.table || table
      return fieldName === field && fieldTable === tableName
    })

    if (!fieldSelect) return `${tableName}.${field} ${order || ''}`.trim()

    let posField = select.indexOf(fieldSelect) + 1
    if (count) posField++
    return `${posField} ${order || ''}`.trim()
  }).join(', ')

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

const filterSelect = ({grouping}, {select, func}) => {
  if (grouping && func) return false
  return (select === undefined || Boolean(select))
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
  const withFunc = Boolean(select.find(({func}) => Boolean(func)))
  const withGroupBy = (count || withFunc) && fields
  if (withGroupBy) return `GROUP BY ${fields}`
  return ''
}

export default ({table, select, where, distinct, limit, page, orderBy, joins, count}) => {
  const selectFields = selFields({table, select, count, distinct})
  const orderFields = orderByFields({table, select, orderBy, count})
  const joinTables = joinReferences({joins})
  const conditional = sqlWhere({select, where, table})
  const limitRows = pagination({limit, page})
  const groupFields = groupBy({select, table, count})
  return toSQL({table, selectFields, conditional, limitRows, orderFields, joinTables, groupFields})
}