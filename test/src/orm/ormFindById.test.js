describe('orm', () => {
  describe('findById', () => {
    let expect, customerModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerORM} = this
      customerModel = customerORM(connection)
    })

    it('find data by id.', async () => {
      const customerData = {name: 'Test Insert', age: 18, birthday: '1988-06-09', deleted: false}
      const {id} = await customerModel.create(customerData)
      const customerFound = customerModel.findById(id)

      expect(customerFound).to.eventually.have.property('age', customerData.age)
      expect(customerFound).to.eventually.have.property('name', customerData.name)
      expect(customerFound).to.eventually.have.property('deleted', customerData.deleted)
      expect(customerFound).to.eventually.have.property('birthday', customerData.birthday)
    })
  })
})
