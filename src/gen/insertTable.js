import { isArray } from './types'
import { prepareReturning } from './utils'

const toSQL = (orm) => {
  const { schema, listFields, paramters } = orm
  const { table, fields } = schema
  const returning = prepareReturning(fields)

  return `
INSERT INTO ${table} (${listFields.join(', ')})
VALUES (${paramters.join(', ')})
RETURNING ${returning};
`.trim()
}

const objValues = (orm, values) => {
  const { schema } = orm
  const { fields } = schema
  orm.values = []
  orm.paramters = []
  orm.listFields = Object.keys(values).filter((field) => fields.hasOwnProperty(field) && values[field] !== undefined)

  orm.listFields.forEach((field) => {
    const asArray = field.toLowerCase() === 'acao' || isArray(fields[field])
    const value = values[field]
    if (asArray) return orm.paramters.push(`'${JSON.stringify([value])}'::JSONB`)
    orm.values.push(value)
    orm.paramters.push(`$${orm.values.length}`)
  })

  return orm
}

export default (schema) => {
  const orm = { schema, values: {} }

  orm.toSQL = toSQL.bind(this, orm)
  orm.objValues = objValues.bind(this, orm)

  return orm
}
