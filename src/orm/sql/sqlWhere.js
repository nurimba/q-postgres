import {breakLine, fieldIsString} from './sqlUtils'

const whereMap = ({where, select, table}) => {
  return where.map((condition) => {
    const {field, comparator, value, or, and} = condition
    if (or) {
      const orConditions = whereMap({where: or, select, table}).join(`)${breakLine}    OR (`)
      return orConditions ? `(${orConditions})` : ''
    }

    if (and) {
      const orConditions = whereMap({where: and, select, table}).join(`)${breakLine}   AND (`)
      return orConditions ? `(${orConditions})` : ''
    }

    let tableName = condition.table || table
    const isString = fieldIsString(select, field)
    const val = isString ? `'${String(value).replace('\'', '\\\'')}'` : value
    return `${tableName}.${field} ${comparator} ${val}`
  })
}

export default ({where, select, table}) => {
  if (!where) return ''
  const conditional = whereMap({where, select, table}).join(`)${breakLine}  AND (`)
  return conditional ? `WHERE (${conditional})` : ''
}
