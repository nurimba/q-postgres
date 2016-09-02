import {orm, types} from 'q-postgres'

const {
  DATE,
  TEXT,
  NAME,
  EMAIL,
  CHAR1,
  CHAR2,
  CHAR8,
  PHONE,
  SELECT,
  INTEGER,
  CPFCNPJ,
  BOOLEAN,
  PRIMARY,
  REFERENCES
} = types

export const customerSchema = {
  table: 'customers',

  fields: {
    id: PRIMARY,
    name: NAME,
    age: INTEGER,
    birthday: DATE,
    deleted: BOOLEAN
  }
}

export const childrenSchema = {
  table: 'children',

  fields: {
    id: PRIMARY,
    name: NAME,
    age: INTEGER,
    birthday: DATE,
    deleted: BOOLEAN,
    customer: {type: REFERENCES, table: 'customers'}
  }
}

export const phoneSchema = {
  table: 'phones',

  fields: {
    id: PRIMARY,
    name: NAME,
    phone: PHONE,
    deleted: BOOLEAN,
    person: {type: REFERENCES, table: 'persons'}
  }
}

export const emailSchema = {
  table: 'emails',

  fields: {
    id: PRIMARY,
    name: NAME,
    email: EMAIL,
    deleted: BOOLEAN,
    person: {type: REFERENCES, table: 'persons'}
  }
}

const personStructure = {
  table: 'persons',

  fields: {
    id: PRIMARY,
    typeDoc: CHAR1,
    codeDoc: CPFCNPJ,
    birthday: DATE,
    name: NAME,
    nickName: NAME,
    observation: TEXT,
    deleted: BOOLEAN,

    addrUf: CHAR2,
    addrZipCode: CHAR8,
    addrCity: NAME,
    addrNeighborhood: NAME,
    addrStreet: NAME,
    addrAdjunct: NAME
  },

  hasMany: {
    phones: {schema: phoneSchema, field: 'person'},
    emails: {schema: emailSchema, field: 'person'}
  }
}

export const personSchema = {
  ...personStructure,
  manyToMany: {
    kinships: {
      schema: {...personStructure, kinship: SELECT},
      table: 'kinships',
      parent: 'person',
      reference: 'relationship',
      extraFields: {
        kinship: SELECT,
        deleted: BOOLEAN
      }
    }
  }
}

export const phoneORM = orm(phoneSchema)
export const emailORM = orm(emailSchema)
export const personORM = orm(personSchema)
export const customerORM = orm(customerSchema)
export const childrenORM = orm(childrenSchema)

export const dropTables = async(connection) => {
  await connection.startTransaction()
  await connection.execute('DROP TABLE IF EXISTS emails;')
  await connection.execute('DROP TABLE IF EXISTS phones;')
  await connection.execute('DROP TABLE IF EXISTS kinships;')
  await connection.execute('DROP TABLE IF EXISTS persons;')
  await connection.execute('DROP TABLE IF EXISTS children;')
  await connection.execute('DROP TABLE IF EXISTS customers;')
  await connection.commit()
  return new Promise(resolve => setTimeout(() => resolve(connection), 350))
}

export const createTables = async(connection) => {
  await connection.startTransaction()
  await connection.execute(`
    CREATE TABLE customers (
      id       ${PRIMARY} PRIMARY KEY,
      name     ${NAME},
      age      ${INTEGER},
      birthday ${DATE},
      deleted  ${BOOLEAN}
    );

    CREATE TABLE children (
      id       ${PRIMARY} PRIMARY KEY,
      name     ${NAME},
      age      ${INTEGER},
      birthday ${DATE},
      deleted  ${BOOLEAN},
      customer INTEGER NOT NULL REFERENCES customers(id)
    );

    CREATE TABLE persons (
      id          ${PRIMARY} PRIMARY KEY,
      typeDoc     ${CHAR1},
      codeDoc     ${CPFCNPJ},
      birthday    ${DATE},
      name        ${NAME},
      nickName    ${NAME},
      observation ${TEXT},
      deleted     ${BOOLEAN},

      addrUf           ${CHAR2},
      addrZipCode      ${CHAR8},
      addrCity         ${NAME},
      addrNeighborhood ${NAME},
      addrStreet       ${NAME},
      addrAdjunct      ${NAME}
    );

    CREATE TABLE emails (
      id      ${PRIMARY} PRIMARY KEY,
      name    ${NAME},
      email   ${EMAIL},
      deleted ${BOOLEAN},
      person  INTEGER NOT NULL REFERENCES persons(id)
    );

    CREATE TABLE phones (
      id      ${PRIMARY} PRIMARY KEY,
      name    ${NAME},
      phone   ${PHONE},
      deleted ${BOOLEAN},
      person  INTEGER NOT NULL REFERENCES persons(id)
    );

    CREATE TABLE kinships (
      id      ${PRIMARY} PRIMARY KEY,
      deleted ${BOOLEAN},
      kinship ${SELECT},
      person INTEGER NOT NULL REFERENCES persons(id),
      relationship INTEGER NOT NULL REFERENCES persons(id)
    );
  `)

  await connection.commit()
  return new Promise(resolve => setTimeout(() => resolve(connection), 350))
}

export const dbTestConfig = {
  user: 'q-postgres',
  database: 'q-postgres',
  password: 'RE7531PH',
  port: 5432,
  max: 10,
  host: 'database',
  idleTimeoutMillis: 30000
}
