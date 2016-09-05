import types from 'orm/types'

const {
  TEXT,
  DATE,
  NAME,
  CHAR1,
  CHAR2,
  CHAR8,
  EMAIL,
  PHONE,
  STRING,
  SELECT,
  CPFCNPJ,
  DATETIME,
  REFERENCES
} = types

export const breakLine = `
`
export const blankLine = `${breakLine}${breakLine}`

export const stringTypes = [
  TEXT,
  NAME,
  DATE,
  CHAR1,
  CHAR2,
  CHAR8,
  EMAIL,
  PHONE,
  STRING,
  SELECT,
  CPFCNPJ,
  DATETIME
]

export const columnIsString = (typing) => {
  const type = getType(typing)
  return stringTypes.indexOf(type) > -1
}

export const getListReturning = ({fields}) => Object.keys(fields).join(', ')

export const getListFields = ({fields, data}) => {
  return Object.keys(fields).filter((field) => {
    return data.hasOwnProperty(field) && data[field] !== undefined
  })
}

export const forceString = (str) => `'${String(str).replace('\'', '\\\'').replace('"', '\\"')}'`

export const fieldIsString = (select, fieldName) => Boolean(select && select.find(({field, type}) => {
  if (fieldName !== field) return false
  return stringTypes.indexOf(type) > -1
}))

const getType = (typing) => {
  if (typeof typing === 'object') return typing.type
  return typing
}

const getFieldsHasMany = (hasMany, fieldsTypes) => {
  if (!hasMany) return
  Object.keys(hasMany).forEach((field) => getFieldsTypes(hasMany[field].schema, fieldsTypes))
}

const getFieldsManyToMany = (manyToMany, fieldsTypes) => {
  if (!manyToMany) return
  Object.keys(manyToMany).forEach((field) => {
    const {table, extraFields, schema} = manyToMany[field]
    getFieldsTypes(schema, fieldsTypes)
    getFieldsTypes({table, fields: extraFields}, fieldsTypes)
  })
}

export const getFieldsTypes = (schema, fieldsTypes) => {
  if (!fieldsTypes) fieldsTypes = {_tables: {}}
  const {table, fields, hasMany, manyToMany} = schema
  if (fieldsTypes._tables.hasOwnProperty(table)) return {}
  fieldsTypes._tables[table] = null

  Object.keys(fields).forEach((field) => {
    const type = getType(fields[field])
    fieldsTypes[`${table}.${field}`] = type
    if (type === REFERENCES) getFieldsTypes(fields[field].schema, fieldsTypes)
  })

  getFieldsHasMany(hasMany, fieldsTypes)
  getFieldsManyToMany(manyToMany, fieldsTypes)

  return fieldsTypes
}

const leftOutFieldSelect = (select, tableName, fieldName) => !select.find(({field, table}) => field === fieldName && table === tableName)

export const objToListFields = ({table, fields, select}) => {
  const fieldSelect = (select || []).map(sel => {
    if (!sel.table) sel.table === table
    return sel
  })

  const filterFields = leftOutFieldSelect.bind(this, fieldSelect, table)

  return fieldSelect.concat(Object.keys(fields).filter(filterFields).map((field) => {
    const type = getType(fields[field])
    return {type, field, table}
  }))
}

const comparators = {
  eq: '=',   // equal
  lt: '<',   // less than
  gt: '>',   // greater than
  lq: '<=',  // less or equal
  gq: '>=',  // greater or equal
  df: '<>',  // diference
  lk: 'like' // = like by argument
}

const getComparatorValueCondition = (conditions, condField) => {
  let value = conditions[condField]
  let comparator
  const partsValue = value.split(':')
  if (partsValue.length === 2) {
    const comp = String(partsValue[0]).toLowerCase().trim()
    if (comparators.hasOwnProperty(comp)) {
      value = String(partsValue[1]).trim()
      comparator = comparators[comp]
      if (comparator === 'like') value = `%${value}%`
    }
  }

  if (!comparator) comparator = '='
  return {value, comparator}
}

const getFieldTableCondition = (condField) => {
  let table
  let field = condField
  const partsField = condField.split('.')
  if (partsField.length === 2) {
    table = String(partsField[0]).trim()
    field = String(partsField[1]).trim()
  }

  return {field, table}
}

export const condToWhereList = (conditions, whereList) => {
  if (!whereList) whereList = []
  const getComparatorValue = getComparatorValueCondition.bind(this, conditions)

  Object.keys(conditions).forEach((condField) => {
    const {field, table} = getFieldTableCondition(condField)
    const {value, comparator} = getComparatorValue(condField)
    whereList.push({field, comparator, value, table})
  })

  return whereList
}

// export const cloneDeep = (obj, ref = {}, cloneRef = {}) => {
//   let copy
//
//   if (obj === null) return obj
//   if (typeof obj !== 'object') return obj
//
//   if (obj instanceof Date) {
//     copy = new Date()
//     copy.setTime(obj.getTime())
//     return copy
//   }
//
//   if (obj instanceof Array) {
//     copy = []
//     for (let i = 0, len = obj.length; i < len; i++) copy[i] = cloneDeep(obj[i], ref, cloneRef)
//     return copy
//   }
//
//   if (obj instanceof Object) {
//     if (ref[obj]) return cloneRef[obj]
//     ref[obj] = true
//     copy = {}
//     cloneRef[obj] = copy
//
//     for (let attr in obj) {
//       if (obj.hasOwnProperty(attr)) copy[attr] = cloneDeep(obj[attr], ref, cloneRef)
//     }
//
//     return copy
//   }
//
//   throw new Error('Unable to copy obj! Its type isn\'t supported.')
// }
