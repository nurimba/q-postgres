import execute from './execute'
import sqlSelect from '../sql/sqlSelect'

const comparators = {
  eq: '=',   // equal
  lt: '<',   // less than
  gt: '>',   // greater than
  lq: '<=',  // less or equal
  gq: '>=',  // greater or equal
  df: '<>',  // diference
  lk: 'like' // = like by argument
}

const condToWhereList = (conditions, whereList = []) => {
  Object.keys(conditions).forEach((field) => {
    let table
    let value = conditions[field]
    let comparator = '='

    const partsValue = value.split(':')
    if (partsValue.length === 2) {
      const comp = String(partsValue[0]).toLowerCase().trim()
      if (comparators.hasOwnProperty(comp)) {
        value = String(partsValue[1]).trim()
        comparator = comparators[comp]
        if (comparator === 'like') value = `%${value}%`
      }
    }

    const partsField = field.split('.')
    if (partsField.length === 2) {
      table = String(partsField[0]).trim()
      field = String(partsField[1]).trim()
    }

    whereList.push({field, comparator, value, table})
  })

  return whereList
}

export default async (schema, connection, conditions) => {
  const where = condToWhereList(conditions)
  const sql = sqlSelect(Object.assign({}, schema, {where, count: true}))
  const {rows} = await execute(schema, connection, sql)
  return rows.pop()._counter
}
