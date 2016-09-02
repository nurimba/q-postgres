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
  if (fieldsTypes) return columnIsString(fieldsTypes[`${tableName}.${field}`])
  return fieldIsString(select, field)
}

const whereMap = (schema) => {
  const {where, select, table, fieldsTypes} = schema
  return where.map((condition) => {
    const {field, comparator, value, or, and} = condition

    if (or) return orCondition(or, select, table)
    if (and) return andCondition(and, select, table)

    let tableName = condition.table || table
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
