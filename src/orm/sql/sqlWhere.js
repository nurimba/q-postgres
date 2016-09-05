import {columnIsString, breakLine, fieldIsString} from 'orm/sql/sqlUtils'

const orCondition = (where, select, table) => {
  const cond = whereMap({where, select, table}).join(`)${breakLine}    OR (`)
  return cond ? `(${cond})` : ''
}

const andCondition = (where, select, table) => {
  const cond = whereMap({where, select, table}).join(`)${breakLine}   AND (`)
  return cond ? `(${cond})` : ''
}

const verifyString = ({select, field, tableName, fieldsTypes}) => {
  const isSelect = (select || []).find(sel => sel.field === field && sel.table === tableName)
  if (isSelect) return fieldIsString(select, field)
  if (fieldsTypes) return columnIsString(fieldsTypes[`${tableName}.${field}`])
  false
}

const whereMap = ({table, where, select, fieldsTypes}) => {
  const tableSchema = table
  return where.map(({table, field, comparator, value, or, and}) => {
    const tableName = table || tableSchema

    if (or) return orCondition(or, select, tableName)
    if (and) return andCondition(and, select, tableName)

    const isString = verifyString({select, field, tableName, fieldsTypes})
    const val = isString ? `'${String(value).replace('\'', '\\\'').replace('"', '\\"')}'` : value
    return `${tableName}.${field} ${comparator} ${val}`
  })
}

export default (schema) => {
  if (!schema.where) return ''
  const conditional = whereMap(schema).join(`)${breakLine}  AND (`)
  return conditional ? `WHERE (${conditional})` : ''
}
