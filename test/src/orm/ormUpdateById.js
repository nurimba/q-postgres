describe('orm', () => {
  describe('updateById', () => {
    let expect, customerModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerSchema} = this
      customerModel = customerSchema(connection)
    })

    it('update data by id.', async () => {
      const {id} = await customerModel.create({name: 'Test Insert', age: 18, birthday: '1988-06-10', deleted: false})
      const updateData = {name: 'Test Update', age: 19, birthday: '1988-07-09', deleted: true}
      const customerUpdated = customerModel.updateById(id, updateData)

      return Promise.all([
        expect(customerUpdated).to.eventually.have.property('age', updateData.age),
        expect(customerUpdated).to.eventually.have.property('name', updateData.name),
        expect(customerUpdated).to.eventually.have.property('deleted', updateData.deleted),
        expect(customerUpdated).to.eventually.have.property('birthday', updateData.birthday)
      ])
    })
  })
})
