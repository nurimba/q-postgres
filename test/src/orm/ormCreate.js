describe('orm', () => {
  describe('create', () => {
    let expect, customerModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerSchema} = this
      customerModel = customerSchema(connection)
    })

    it('create data.', () => {
      const customerData = {name: 'Test Insert', age: 18, birthday: '1988-06-08', deleted: false}
      const customerCreate = customerModel.create(customerData)

      expect(customerCreate).to.eventually.have.property('age', customerData.age)
      expect(customerCreate).to.eventually.have.property('name', customerData.name)
      expect(customerCreate).to.eventually.have.property('deleted', customerData.deleted)
      expect(customerCreate).to.eventually.have.property('birthday', customerData.birthday)
    })
  })
})
