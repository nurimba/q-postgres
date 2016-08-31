const checkPerson = (expect, actual, expected) => {
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

describe('orm', () => {
  describe('create', () => {
    let expect, customerModel, personModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerORM, personORM} = this
      customerModel = customerORM(connection)
      personModel = personORM(connection)
    })

    it('create simple data.', () => {
      const customerData = {name: 'Test Insert', age: 18, birthday: '1988-06-08', deleted: false}
      const customerCreate = customerModel.create(customerData)

      expect(customerCreate).to.eventually.have.property('age', customerData.age)
      expect(customerCreate).to.eventually.have.property('name', customerData.name)
      expect(customerCreate).to.eventually.have.property('deleted', customerData.deleted)
      expect(customerCreate).to.eventually.have.property('birthday', customerData.birthday)
    })

    it('create has many data.', async () => {
      const personData = {
        typeDoc: 'F',
        codeDoc: '01509311157',
        birthday: '1988-06-10',
        name: 'Person Sample',
        nickName: 'Samplix',
        observation: 'Without observation',

        addrUf: 'SC',
        addrZipCode: '88050300',
        addrCity: 'Florianópolis',
        addrNeighborhood: 'Santo Antônio de Lisbôa',
        addrStreet: 'Estrada Caminho dos Açores',
        addrAdjunct: 'Sem número',

        emails: [
          {name: 'Email 1', email: 'email1@email1.com'},
          {name: 'Email 2', email: 'email2@email2.com'}
        ],

        phones: [
          {name: 'Phone 1', phone: '(48) 8810-8161'},
          {name: 'Phone 2', phone: '(48) 8820-8161'}
        ]
      }

      const customerCreate = await personModel.create(personData)
      checkPerson(expect, customerCreate, personData)

      expect(customerCreate.emails[0].name).to.equal(personData.emails[0].name)
      expect(customerCreate.emails[0].email).to.equal(personData.emails[0].email)
      expect(customerCreate.emails[0].person).to.equal(customerCreate.id)
      expect(customerCreate.emails[0].deleted).to.equal(false)

      expect(customerCreate.emails[1].name).to.equal(personData.emails[1].name)
      expect(customerCreate.emails[1].email).to.equal(personData.emails[1].email)
      expect(customerCreate.emails[1].person).to.equal(customerCreate.id)
      expect(customerCreate.emails[1].deleted).to.equal(false)

      expect(customerCreate.phones[0].name).to.equal(personData.phones[0].name)
      expect(customerCreate.phones[0].phone).to.equal(personData.phones[0].phone)
      expect(customerCreate.phones[0].person).to.equal(customerCreate.id)
      expect(customerCreate.phones[0].deleted).to.equal(false)

      expect(customerCreate.phones[1].name).to.equal(personData.phones[1].name)
      expect(customerCreate.phones[1].phone).to.equal(personData.phones[1].phone)
      expect(customerCreate.phones[1].person).to.equal(customerCreate.id)
      expect(customerCreate.phones[1].deleted).to.equal(false)
    })

    it('create many to many data.', async () => {
      const personData = {
        typeDoc: 'F',
        codeDoc: '09021452073',
        birthday: '1987-06-10',
        name: 'Person Sample many to many',
        nickName: 'Samplex',
        observation: 'With observation',

        addrUf: 'RS',
        addrZipCode: '88050300',
        addrCity: 'Porto néhhhh',
        addrNeighborhood: 'Santo Antônio de Lisbôa',
        addrStreet: 'Avenida Caminho dos Açores',
        addrAdjunct: 'S/N'
      }

      const kinshipData = {
        typeDoc: 'F',
        kinship: 'TIO',
        codeDoc: '51075878101',
        birthday: '1986-06-10',
        name: 'Kinship Sample many to many',
        nickName: 'Kin',
        observation: 'With kin observation',

        addrUf: 'MS',
        addrZipCode: '79004570',
        addrCity: 'Campão',
        addrNeighborhood: 'Monte Líbano',
        addrStreet: 'Rua senador Ponce',
        addrAdjunct: '355, fundos',

        emails: [
          {name: 'Email 3', email: 'email3@email1.com'},
          {name: 'Email 4', email: 'email4@email2.com'}
        ],

        phones: [
          {name: 'Phone 5', phone: '(48) 98810-8161'},
          {name: 'Phone 6', phone: '(48) 98820-8161'}
        ]
      }

      personData.kinships = [kinshipData]

      const customerCreated = await personModel.create(personData)
      const kinshipCreated = customerCreated.kinships[0]

      checkPerson(expect, customerCreated, personData)
      checkPerson(expect, kinshipCreated, kinshipData)
    })
  })
})
