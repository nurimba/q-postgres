import {breakLine, fieldIsString} from 'orm/sql/sqlUtils'

const orCondition = (where, select, table) => {
  const cond = whereMap({where, select, table}).join(`)${breakLine}    OR (`)
  return cond ? `(${cond})` : ''
}

const andCondition = (where, select, table) => {
  const cond = whereMap({where, select, table}).join(`)${breakLine}   AND (`)
  return cond ? `(${cond})` : ''
}

const whereMap = ({where, select, table}) => {
  return where.map((condition) => {
    const {field, comparator, value, or, and} = condition

    if (or) return orCondition(or, select, table)
    if (and) return andCondition(and, select, table)

    let tableName = condition.table || table
    const isString = fieldIsString(select, field)
    const val = isString ? `'${String(value).replace('\'', '\\\'').replace('"', '\\"')}'` : value
    return `${tableName}.${field} ${comparator} ${val}`
  })
}

export default ({where, select, table}) => {
  if (!where) return ''
  const conditional = whereMap({where, select, table}).join(`)${breakLine}  AND (`)
  return conditional ? `WHERE (${conditional})` : ''
}
