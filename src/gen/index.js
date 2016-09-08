import typeSchemas from 'gen/types'
import dropTableGenerator from 'gen/dropTable'
import alterTableGenerator from 'gen/alterTable'
import createTableGenerator from 'gen/createTable'
import insertTableGenerator from 'gen/insertTable'
import updateTableGenerator from 'gen/updateTable'
import deleteTableGenerator from 'gen/deleteTable'
import selectTableGenerator from 'gen/selectTable'

export const types = typeSchemas
export const dropTable = dropTableGenerator
export const alterTable = alterTableGenerator
export const createTable = createTableGenerator
export const insertTable = insertTableGenerator
export const updateTable = updateTableGenerator
export const deleteTable = deleteTableGenerator
export const selectTable = selectTableGenerator

export default {
  types,
  dropTable,
  alterTable,
  createTable,
  insertTable,
  updateTable,
  deleteTable,
  selectTable
}
