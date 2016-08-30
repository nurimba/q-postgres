import orm from '../src/orm'
import qPostgres from '../src'
import chai from 'chai'
import chaiPromised from 'chai-as-promised'
import mochaPromised from 'mocha-as-promised'

mochaPromised()
chai.use(chaiPromised)
const {expect} = chai

const customerStructure = {
  table: 'customers',

  fields: {
    id: { type: String },
    name: { type: String },
    age: { type: Number },
    birthday: { type: Date },
    deleted: { type: Boolean }
  }
}

const childrenStructure = {
  table: 'children',

  fields: {
    id: { type: String },
    name: { type: String },
    age: { type: Number },
    birthday: { type: Date },
    deleted: { type: Boolean },
    customer: { type: String }
  }
}

const customerSchema = orm(customerStructure)
const childrenSchema = orm(childrenStructure)

const dropTables = async(connection) => {
  await connection.startTransaction()
  await connection.execute('DROP TABLE IF EXISTS children;')
  await connection.execute('DROP TABLE IF EXISTS customers;')
  await connection.commit()
  return new Promise(resolve => setTimeout(() => resolve(connection), 350))
}

const createTables = async(connection) => {
  await connection.startTransaction()
  await connection.execute(`
    CREATE TABLE customers (
      id       SERIAL PRIMARY KEY,
      name     VARCHAR(255),
      age      INTEGER,
      birthday DATE,
      deleted  BOOLEAN
    );

    CREATE TABLE children (
      id       SERIAL PRIMARY KEY,
      name     VARCHAR(255),
      age      INTEGER,
      birthday DATE,
      deleted  BOOLEAN,
      customer INTEGER NOT NULL REFERENCES customers(id)
    );
  `)
  await connection.commit()
  return new Promise(resolve => setTimeout(() => resolve(connection), 350))
}

before(function (done) {
  const pool = qPostgres({
    user: 'q-postgres',
    database: 'q-postgres',
    password: 'RE7531PH',
    port: 5432,
    max: 10,
    host: 'database',
    idleTimeoutMillis: 30000
  })

  pool.connect().then(dropTables).then(createTables).then((connection) => {
    Object.assign(this, {
      expect,
      connection,
      customerSchema,
      childrenSchema,
      customerStructure,
      childrenStructure
    })
  }).then(done).catch(done)
})

beforeEach(function (done) {
  const {connection} = this
  connection.startTransaction().then(() => done()).catch(done)
})

afterEach(function (done) {
  const {connection} = this
  connection.rollback().then(() => done()).catch(done)
})

after(function (done) {
  const {connection} = this
  dropTables(connection).then(() => connection.release()).then(() => done()).catch(done)
})
