import {isArray} from './types'
import {prepareReturning} from './utils'
import comWhere from 'gen/comparatorWhere'
const breakline = `
`

const toSQL = (orm) => {
  const {schema, paramters, conditions} = orm
  const {table, fields} = schema
  const returning = prepareReturning(fields)
  const sqlWhere = conditions && conditions.length
    ? `${breakline}WHERE (${conditions.join(`)${breakline}  AND (`)})`
    : ''

  return `
UPDATE ${table} SET
  ${paramters.join(`,${breakline}  `)}${sqlWhere}
RETURNING ${returning};
`.trim()
}

const objValues = (orm, values, conditions) => {
  const {schema} = orm
  const {fields} = schema

  orm.values = []
  orm.paramters = []
  const listFields = Object.keys(values).filter((field) => fields.hasOwnProperty(field) && values[field] !== undefined)

  listFields.forEach((field) => {
    const asArray = isArray(fields[field])
    const value = values[field]
    if (asArray) return orm.paramters.push(`${field} || ${JSON.stringify([value])}::JSONB`)

    orm.values.push(value)
    orm.paramters.push(`${field} = $${orm.values.length}`)
  })

  orm.conditions = Object.keys({...conditions}).map((field, index) => {
    const {comparator, value} = comWhere(conditions[field])
    orm.values.push(value)
    return `${field} ${comparator} $${orm.values.length}`
  })

  return orm
}

export default (schema) => {
  const orm = {schema, values: [], conditions: []}

  orm.toSQL = toSQL.bind(this, orm)
  orm.objValues = objValues.bind(this, orm)

  return orm
}
