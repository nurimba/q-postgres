describe('orm', () => {
  describe('deleteById', () => {
    let expect, customerModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerORM} = this
      customerModel = customerORM(connection)
    })

    it('delete data by id.', async () => {
      let customer
      const {id} = await customerModel.create({name: 'Test Insert', age: 18, birthday: '1988-06-10', deleted: false})
      customer = await customerModel.findById(id)
      expect(customer).to.be.not.undefined

      await customerModel.deleteById(id)
      customer = await customerModel.findById(id)
      expect(customer).to.be.undefined
    })
  })
})
