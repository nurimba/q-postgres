import expect from 'support/expect'
import phoneFactory from 'support/factories/phoneFactory'
import emailFactory from 'support/factories/emailFactory'
import personFactory from 'support/factories/personFactory'

describe('orm', () => {
  describe('find by id', () => {
    let personModel, personData, kinshipData, personId

    beforeEach(function () {
      personModel = this.personModel
      personData = personFactory()
      kinshipData = personFactory()

      personData.emails = [emailFactory()]
      personData.phones = [phoneFactory()]

      kinshipData.kin = 'TIO/TIA'
      kinshipData.emails = [emailFactory()]
      kinshipData.phones = [phoneFactory()]
      personData.kinships = [kinshipData]

      return personModel.insert(personData).then(person => (personId = person.id))
    })

    it('find simple data.', async () => {
      const personFound = await personModel.findById(personId)

      expect(personFound.id).to.equal(personId)
      expect(personFound.typeDoc).to.equal(personData.typeDoc)
      expect(personFound.codeDoc).to.equal(personData.codeDoc)
      expect(personFound.birthday).to.equal(personData.birthday)
      expect(personFound.name).to.equal(personData.name)
      expect(personFound.nickName).to.equal(personData.nickName)
      expect(personFound.observation).to.equal(personData.observation)
      expect(personFound.deleted).to.equal(false)
      expect(personFound.addrUf).to.equal(personData.addrUf)
      expect(personFound.addrZipCode).to.equal(personData.addrZipCode)
      expect(personFound.addrCity).to.equal(personData.addrCity)
      expect(personFound.addrNeighborhood).to.equal(personData.addrNeighborhood)
      expect(personFound.addrStreet).to.equal(personData.addrStreet)
      expect(personFound.addrAdjunct).to.equal(personData.addrAdjunct)
    })

    it('find has many.', async () => {
      const personFound = await personModel.findById(personId)

      const {emails, phones, id} = personFound

      expect(emails[0].id).to.above(0)
      expect(emails[0].name).to.equal(personData.emails[0].name)
      expect(emails[0].email).to.equal(personData.emails[0].email)
      expect(emails[0].deleted).to.equal(false)
      expect(emails[0].person).to.equal(id)

      expect(phones[0].id).to.above(0)
      expect(phones[0].name).to.equal(personData.phones[0].name)
      expect(phones[0].phone).to.equal(personData.phones[0].phone)
      expect(phones[0].deleted).to.equal(false)
      expect(phones[0].person).to.equal(id)
    })

    it('find many to many.', async () => {
      const personFound = await personModel.findById(personId)
      const {kinships} = personFound
      const kinshipFound = kinships[0]
      const {emails, phones, id} = kinshipFound

      expect(kinshipFound.id).to.above(0)
      expect(kinshipFound.kin).to.equal(kinshipData.kin)
      expect(kinshipFound.typeDoc).to.equal(kinshipData.typeDoc)
      expect(kinshipFound.codeDoc).to.equal(kinshipData.codeDoc)
      expect(kinshipFound.birthday).to.equal(kinshipData.birthday)
      expect(kinshipFound.name).to.equal(kinshipData.name)
      expect(kinshipFound.nickName).to.equal(kinshipData.nickName)
      expect(kinshipFound.observation).to.equal(kinshipData.observation)
      expect(kinshipFound.deleted).to.equal(false)
      expect(kinshipFound.addrUf).to.equal(kinshipData.addrUf)
      expect(kinshipFound.addrZipCode).to.equal(kinshipData.addrZipCode)
      expect(kinshipFound.addrCity).to.equal(kinshipData.addrCity)
      expect(kinshipFound.addrNeighborhood).to.equal(kinshipData.addrNeighborhood)
      expect(kinshipFound.addrStreet).to.equal(kinshipData.addrStreet)
      expect(kinshipFound.addrAdjunct).to.equal(kinshipData.addrAdjunct)

      expect(emails[0].id).to.above(0)
      expect(emails[0].name).to.equal(kinshipData.emails[0].name)
      expect(emails[0].email).to.equal(kinshipData.emails[0].email)
      expect(emails[0].deleted).to.equal(false)
      expect(emails[0].person).to.equal(id)

      expect(phones[0].id).to.above(0)
      expect(phones[0].name).to.equal(kinshipData.phones[0].name)
      expect(phones[0].phone).to.equal(kinshipData.phones[0].phone)
      expect(phones[0].deleted).to.equal(false)
      expect(phones[0].person).to.equal(id)
    })
  })
})
