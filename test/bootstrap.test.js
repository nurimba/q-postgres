import chai from 'chai'
import chaiPromised from 'chai-as-promised'
import mochaPromised from 'mocha-as-promised'

import {pool} from 'q-postgres'
import personFactory from 'factories/personFactory'
import customerFactory from 'factories/customerFactory'
import {
  dbTestConfig,
  dropTables,
  createTables,
  phoneORM,
  emailORM,
  personORM,
  customerORM,
  childrenORM,
  phoneSchema,
  emailSchema,
  personSchema,
  customerSchema,
  childrenSchema
} from 'factories/dbFactory'

mochaPromised()
chai.use(chaiPromised)
const {expect} = chai

const checkPerson = (actual, expected) => {
  expect(actual.id).to.be.above(0)
  expect(actual.name).to.equal(expected.name)
  expect(actual.typeDoc).to.equal(expected.typeDoc)
  expect(actual.codeDoc).to.equal(expected.codeDoc)
  expect(actual.birthday).to.equal(expected.birthday)
  expect(actual.nickName).to.equal(expected.nickName)
  expect(actual.observation).to.equal(expected.observation)

  expect(actual.addrUf).to.equal(expected.addrUf)
  expect(actual.addrCity).to.equal(expected.addrCity)
  expect(actual.addrStreet).to.equal(expected.addrStreet)
  expect(actual.addrZipCode).to.equal(expected.addrZipCode)
  expect(actual.addrAdjunct).to.equal(expected.addrAdjunct)
  expect(actual.addrNeighborhood).to.equal(expected.addrNeighborhood)
}

before(function (done) {
  const pooling = pool(dbTestConfig)

  pooling.connect().then(dropTables).then(createTables).then((connection) => {
    Object.assign(this, {
      expect,
      connection,

      phoneORM,
      emailORM,
      personORM,
      customerORM,
      childrenORM,

      phoneSchema,
      emailSchema,
      personSchema,
      customerSchema,
      childrenSchema,

      checkPerson,

      personFactory,
      customerFactory
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
