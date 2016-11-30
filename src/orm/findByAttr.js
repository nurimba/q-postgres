import selectData from 'orm/select'
import objRow from 'orm/objRow'

const populateHasMany = (tables, connection, schema, row, refs) => {
  const {hasMany} = schema

  return Promise.all(Object.keys(hasMany || {}).map(async (hasManyField) => {
    const {table, field} = hasMany[hasManyField]
    const schemaHasMany = tables[table]
    const select = selectData.bind(this, connection, schemaHasMany)
    let filter = {[field]: row.id}
    if (schemaHasMany.deleteField) filter[schemaHasMany.deleteField] = false
    const {rows} = await select('id').where(filter).run()
    if (!rows || !rows.length) return

    row[hasManyField] = await Promise.all(rows.map(({id}) => findById(tables, connection, schemaHasMany, id, refs)))
  }))
}

const populateManyToMany = (tables, connection, schema, row, refs) => {
  const {manyToMany} = schema

  return Promise.all(Object.keys(manyToMany || {}).map(async (manyToManyField) => {
    const {table, primary, secondary, extraFields, schema} = manyToMany[manyToManyField]
    const schemaManyToMany = tables[table]
    const select = selectData.bind(this, connection, schemaManyToMany)
    const listExtraFields = Object.keys(extraFields)
    let filter = {[primary]: row.id}
    if (schemaManyToMany.deleteField) filter[schemaManyToMany.deleteField] = false
    const {rows} = await select(secondary, ...listExtraFields).where(filter).run()
    if (!rows || !rows.length) return

    row[manyToManyField] = await Promise.all(rows.map(async (rel) => {
      const id = rel[secondary]
      const row = await findById(tables, connection, tables[schema], id, refs)
      listExtraFields.forEach(field => (row[field] = rel[field]))
      return row
    }))
  }))
}

const findById = async (tables, connection, schema, id, refs = {}) => {
  const ref = `${schema.table}-${id}`
  if (refs.hasOwnProperty(ref)) return {...refs[ref]}
  const select = selectData.bind(this, connection, schema)
  let filter = {id}
  if (schema.deleteField) filter[schema.deleteField] = false
  const {rows} = await select().where(filter).limit(1).run()
  if (!rows || !rows.length) return undefined
  const row = rows.map(objRow.bind(this, schema)).shift()
  await populateHasMany(tables, connection, schema, row, refs)
  await populateManyToMany(tables, connection, schema, row, refs)
  refs[ref] = {...row}
  return row
}

const findBy = async (tables, connection, schema, attr, value, refs) => {
  const select = selectData.bind(this, connection, schema)
  let filter = {[attr]: value}
  if (schema.deleteField) filter[schema.deleteField] = false
  const {rows} = await select('id').where(filter).run()
  if (!rows || !rows.length) return []

  if (!refs) refs = {}
  const searchsById = rows.map(({id}) => findById(tables, connection, schema, id, refs))
  return Promise.all(searchsById)
}

const findByAttr = (tables, connection, schema) => {
  const findObj = {}

  Object.keys(schema.fields).forEach((field) => {
    const findAttr = `findBy${field.charAt(0).toUpperCase().concat(field.slice(1))}`
    if (field === 'id') return (findObj[findAttr] = findById.bind(this, tables, connection, schema))
    findObj[findAttr] = findBy.bind(this, tables, connection, schema, field)
  })

  return findObj
}

export default findByAttr
