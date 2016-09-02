describe('orm', () => {
  describe('countByQuery', () => {
    let expect, customerModel, childrenModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerORM, childrenORM} = this
      customerModel = customerORM(connection)
      childrenModel = childrenORM(connection)
    })

    it('count by query table.', async () => {
      await customerModel.create({name: 'Test Query 1', age: 20, birthday: '1988-07-10', deleted: true})
      await customerModel.create({name: 'Test Query 12', age: 21, birthday: '1988-08-10', deleted: false})
      await customerModel.create({name: 'Test Query 123', age: 22, birthday: '1988-09-10', deleted: false})
      let counter

      counter = await customerModel.countByQuery({deleted: 'eq:false'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({deleted: 'df:false'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({age: 'eq:20'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({age: 'lt:20'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({age: 'gt:20'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({age: 'lq:20'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({age: 'gq:20'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({age: 'df:20'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({birthday: 'eq:1988-07-10'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({birthday: 'lt:1988-07-10'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({birthday: 'gt:1988-07-10'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({birthday: 'lq:1988-07-10'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({birthday: 'gq:1988-07-10'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({birthday: 'df:1988-07-10'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({name: 'eq:Test Query 1'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({name: 'lt:Test Query 1'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({name: 'gt:Test Query 1'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({name: 'lq:Test Query 1'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({name: 'gq:Test Query 1'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({name: 'df:Test Query 1'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({name: 'lk:Test Query 1'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({name: 'lk:Test Query 12'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({name: 'lk:Test Query 123'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({name: 'lk:Test Query 1234'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({deleted: 'false'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({age: '20'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({birthday: '1988-07-10'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({name: 'Test Query 1'})
      expect(counter).to.equal(1)
    })

    it('count by query join.', async () => {
      const customer1 = await customerModel.create({name: 'Customer Query 1', age: 20, birthday: '1988-07-10', deleted: true})
      const customer2 = await customerModel.create({name: 'Customer Query 12', age: 21, birthday: '1988-08-10', deleted: false})
      const customer3 = await customerModel.create({name: 'Customer Query 123', age: 22, birthday: '1988-09-10', deleted: false})
      await childrenModel.create({name: 'Child Query 1', age: 11, expired: '1994-07-10', deleted: true, customer: customer1.id})
      await childrenModel.create({name: 'Child Query 12', age: 12, expired: '1994-08-10', deleted: false, customer: customer2.id})
      await childrenModel.create({name: 'Child Query 123', age: 13, expired: '1994-09-10', deleted: false, customer: customer3.id})

      customerModel.join('JOIN children ON (children.customer = customers.id)')
      let counter

      counter = await customerModel.countByQuery({'children.age': 'eq:11'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.age': 'lt:11'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({'children.age': 'gt:11'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.age': 'lq:11'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.age': 'gq:11'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({'children.age': 'df:11'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.expired': 'eq:1994-07-10'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.expired': 'lt:1994-07-10'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({'children.expired': 'gt:1994-07-10'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.expired': 'lq:1994-07-10'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.expired': 'gq:1994-07-10'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({'children.expired': 'df:1994-07-10'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.name': 'eq:Child Query 1'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.name': 'lt:Child Query 1'})
      expect(counter).to.equal(0)

      counter = await customerModel.countByQuery({'children.name': 'gt:Child Query 1'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.name': 'lq:Child Query 1'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.name': 'gq:Child Query 1'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({'children.name': 'df:Child Query 1'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.name': 'lk:Child Query 1'})
      expect(counter).to.equal(3)

      counter = await customerModel.countByQuery({'children.name': 'lk:Child Query 12'})
      expect(counter).to.equal(2)

      counter = await customerModel.countByQuery({'children.name': 'lk:Child Query 123'})
      expect(counter).to.equal(1)

      counter = await customerModel.countByQuery({'children.name': 'lk:Child Query 1234'})
      expect(counter).to.equal(0)
    })
  })
})
