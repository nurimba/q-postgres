describe('orm', () => {
  describe('create', () => {
    let expect, personFactory, customerFactory, customerModel, personModel, checkPerson

    beforeEach(function () {
      expect = this.expect
      personFactory = this.personFactory
      customerFactory = this.customerFactory
      checkPerson = this.checkPerson
      const {connection, customerORM, personORM} = this
      customerModel = customerORM(connection)
      personModel = personORM(connection)
    })

    it('create simple data.', () => {
      const customerData = customerFactory()
      const customerCreate = customerModel.create(customerData)

      expect(customerCreate).to.eventually.have.property('age', customerData.age)
      expect(customerCreate).to.eventually.have.property('name', customerData.name)
      expect(customerCreate).to.eventually.have.property('deleted', customerData.deleted)
      expect(customerCreate).to.eventually.have.property('birthday', customerData.birthday)
    })

    it('create has many data.', async () => {
      const personData = personFactory()

      const customerCreate = await personModel.create(personData)
      checkPerson(customerCreate, personData)

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
      const personData = personFactory()
      const kinshipData = personFactory()
      kinshipData.kinship = 'TIO'
      personData.kinships = [kinshipData]

      const customerCreated = await personModel.create(personData)
      const kinshipCreated = customerCreated.kinships[0]

      checkPerson(customerCreated, personData)
      checkPerson(kinshipCreated, kinshipData)
      expect(kinshipCreated.kinship).to.equal('TIO')

      expect(kinshipCreated.emails[0].name).to.equal(kinshipData.emails[0].name)
      expect(kinshipCreated.emails[0].email).to.equal(kinshipData.emails[0].email)
      expect(kinshipCreated.emails[0].person).to.equal(kinshipCreated.id)
      expect(kinshipCreated.emails[0].deleted).to.equal(false)

      expect(kinshipCreated.emails[1].name).to.equal(kinshipData.emails[1].name)
      expect(kinshipCreated.emails[1].email).to.equal(kinshipData.emails[1].email)
      expect(kinshipCreated.emails[1].person).to.equal(kinshipCreated.id)
      expect(kinshipCreated.emails[1].deleted).to.equal(false)

      expect(kinshipCreated.phones[0].name).to.equal(kinshipData.phones[0].name)
      expect(kinshipCreated.phones[0].phone).to.equal(kinshipData.phones[0].phone)
      expect(kinshipCreated.phones[0].person).to.equal(kinshipCreated.id)
      expect(kinshipCreated.phones[0].deleted).to.equal(false)

      expect(kinshipCreated.phones[1].name).to.equal(kinshipData.phones[1].name)
      expect(kinshipCreated.phones[1].phone).to.equal(kinshipData.phones[1].phone)
      expect(kinshipCreated.phones[1].person).to.equal(kinshipCreated.id)
      expect(kinshipCreated.phones[1].deleted).to.equal(false)
    })
  })
})
