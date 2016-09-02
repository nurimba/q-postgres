describe('orm', () => {
  describe('updateById', () => {
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

    it('update simple data.', async () => {
      const {id} = await customerModel.create(customerFactory())
      const customerData = customerFactory()
      const customerUpdated = customerModel.updateById(id, customerData)

      expect(customerUpdated).to.eventually.have.property('age', customerData.age)
      expect(customerUpdated).to.eventually.have.property('name', customerData.name)
      expect(customerUpdated).to.eventually.have.property('deleted', customerData.deleted)
      expect(customerUpdated).to.eventually.have.property('birthday', customerData.birthday)
    })

    it('update has many data.', async () => {
      const personCreated = await personModel.create(personFactory())
      const personData = personFactory()
      const idPerson = personCreated.id
      personCreated.emails.forEach(({id}, index) => Object.assign(personData.emails[index], {id}))
      personCreated.phones.forEach(({id}, index) => Object.assign(personData.phones[index], {id}))
      const personUpdated = await personModel.updateById(personCreated.id, personData)

      expect(personUpdated.id).to.equal(idPerson)
      checkPerson(personUpdated, personData)

      expect(personUpdated.emails[0].id).to.equal(personCreated.emails[0].id)
      expect(personUpdated.emails[0].name).to.equal(personData.emails[0].name)
      expect(personUpdated.emails[0].email).to.equal(personData.emails[0].email)
      expect(personUpdated.emails[0].person).to.equal(idPerson)
      expect(personUpdated.emails[0].deleted).to.equal(false)

      expect(personUpdated.emails[1].id).to.equal(personCreated.emails[1].id)
      expect(personUpdated.emails[1].name).to.equal(personData.emails[1].name)
      expect(personUpdated.emails[1].email).to.equal(personData.emails[1].email)
      expect(personUpdated.emails[1].person).to.equal(idPerson)
      expect(personUpdated.emails[1].deleted).to.equal(false)

      expect(personUpdated.phones[0].id).to.equal(personCreated.phones[0].id)
      expect(personUpdated.phones[0].name).to.equal(personData.phones[0].name)
      expect(personUpdated.phones[0].phone).to.equal(personData.phones[0].phone)
      expect(personUpdated.phones[0].person).to.equal(idPerson)
      expect(personUpdated.phones[0].deleted).to.equal(false)

      expect(personUpdated.phones[1].id).to.equal(personCreated.phones[1].id)
      expect(personUpdated.phones[1].name).to.equal(personData.phones[1].name)
      expect(personUpdated.phones[1].phone).to.equal(personData.phones[1].phone)
      expect(personUpdated.phones[1].person).to.equal(idPerson)
      expect(personUpdated.phones[1].deleted).to.equal(false)
    })

    it('update many to many data.', async () => {
      const personDataToInsert = personFactory()
      personDataToInsert.kinships = [personFactory()]
      const personCreated = await personModel.create(personDataToInsert)
      const kinshipCreated = personCreated.kinships[0]
      const kinshipId = kinshipCreated.id
      const kinshipData = personFactory()

      kinshipData.id = kinshipId
      kinshipCreated.emails.forEach(({id}, index) => Object.assign(kinshipData.emails[index], {id}))
      kinshipCreated.phones.forEach(({id}, index) => Object.assign(kinshipData.phones[index], {id}))
      personCreated.kinships = [kinshipData]
      const personUpdated = await personModel.updateById(personCreated.id, personCreated)
      const kinshipUpdated = personUpdated.kinships[0]
      expect(kinshipUpdated.id).to.equal(kinshipId)
      checkPerson(kinshipUpdated, kinshipData)

      expect(kinshipUpdated.emails[0].id).to.equal(kinshipCreated.emails[0].id)
      expect(kinshipUpdated.emails[0].name).to.equal(kinshipData.emails[0].name)
      expect(kinshipUpdated.emails[0].email).to.equal(kinshipData.emails[0].email)
      expect(kinshipUpdated.emails[0].person).to.equal(kinshipId)
      expect(kinshipUpdated.emails[0].deleted).to.equal(false)

      expect(kinshipUpdated.emails[1].id).to.equal(kinshipCreated.emails[1].id)
      expect(kinshipUpdated.emails[1].name).to.equal(kinshipData.emails[1].name)
      expect(kinshipUpdated.emails[1].email).to.equal(kinshipData.emails[1].email)
      expect(kinshipUpdated.emails[1].person).to.equal(kinshipId)
      expect(kinshipUpdated.emails[1].deleted).to.equal(false)

      expect(kinshipUpdated.phones[0].id).to.equal(kinshipCreated.phones[0].id)
      expect(kinshipUpdated.phones[0].name).to.equal(kinshipData.phones[0].name)
      expect(kinshipUpdated.phones[0].phone).to.equal(kinshipData.phones[0].phone)
      expect(kinshipUpdated.phones[0].person).to.equal(kinshipId)
      expect(kinshipUpdated.phones[0].deleted).to.equal(false)

      expect(kinshipUpdated.phones[1].id).to.equal(kinshipCreated.phones[1].id)
      expect(kinshipUpdated.phones[1].name).to.equal(kinshipData.phones[1].name)
      expect(kinshipUpdated.phones[1].phone).to.equal(kinshipData.phones[1].phone)
      expect(kinshipUpdated.phones[1].person).to.equal(kinshipId)
      expect(kinshipUpdated.phones[1].deleted).to.equal(false)
    })
  })
})
