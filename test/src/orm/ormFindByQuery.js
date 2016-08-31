describe('orm', () => {
  describe('findByQuery', () => {
    let expect, customerModel, childrenModel

    beforeEach(function () {
      expect = this.expect
      const {connection, customerORM, childrenORM} = this
      customerModel = customerORM(connection)
      childrenModel = childrenORM(connection)
    })

    it('find by query table.', async () => {
      await customerModel.create({name: 'Test Query 1', age: 20, birthday: '1988-07-10', deleted: true})
      await customerModel.create({name: 'Test Query 12', age: 21, birthday: '1988-08-10', deleted: false})
      await customerModel.create({name: 'Test Query 123', age: 22, birthday: '1988-09-10', deleted: false})
      let rows

      rows = await customerModel.findByQuery({deleted: 'eq:false'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({deleted: 'df:false'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({age: 'eq:20'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({age: 'lt:20'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({age: 'gt:20'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({age: 'lq:20'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({age: 'gq:20'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({age: 'df:20'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({birthday: 'eq:1988-07-10'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({birthday: 'lt:1988-07-10'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({birthday: 'gt:1988-07-10'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({birthday: 'lq:1988-07-10'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({birthday: 'gq:1988-07-10'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({birthday: 'df:1988-07-10'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({name: 'eq:Test Query 1'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({name: 'lt:Test Query 1'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({name: 'gt:Test Query 1'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({name: 'lq:Test Query 1'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({name: 'gq:Test Query 1'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({name: 'df:Test Query 1'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({name: 'lk:Test Query 1'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({name: 'lk:Test Query 12'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({name: 'lk:Test Query 123'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({name: 'lk:Test Query 1234'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({deleted: 'false'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({age: '20'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({birthday: '1988-07-10'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({name: 'Test Query 1'})
      expect(rows.length).to.equal(1)
    })

    it('find by query join.', async () => {
      const customer1 = await customerModel.create({name: 'Customer Query 1', age: 20, birthday: '1988-07-10', deleted: true})
      const customer2 = await customerModel.create({name: 'Customer Query 12', age: 21, birthday: '1988-08-10', deleted: false})
      const customer3 = await customerModel.create({name: 'Customer Query 123', age: 22, birthday: '1988-09-10', deleted: false})
      await childrenModel.create({name: 'Child Query 1', age: 11, birthday: '1994-07-10', deleted: true, customer: customer1.id})
      await childrenModel.create({name: 'Child Query 12', age: 12, birthday: '1994-08-10', deleted: false, customer: customer2.id})
      await childrenModel.create({name: 'Child Query 123', age: 13, birthday: '1994-09-10', deleted: false, customer: customer3.id})

      customerModel.join('JOIN children ON (children.customer = customers.id)')
      let rows

      rows = await customerModel.findByQuery({'children.age': 'eq:11'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.age': 'lt:11'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({'children.age': 'gt:11'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.age': 'lq:11'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.age': 'gq:11'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({'children.age': 'df:11'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.birthday': 'eq:1994-07-10'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.birthday': 'lt:1994-07-10'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({'children.birthday': 'gt:1994-07-10'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.birthday': 'lq:1994-07-10'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.birthday': 'gq:1994-07-10'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({'children.birthday': 'df:1994-07-10'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.name': 'eq:Child Query 1'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.name': 'lt:Child Query 1'})
      expect(rows.length).to.equal(0)

      rows = await customerModel.findByQuery({'children.name': 'gt:Child Query 1'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.name': 'lq:Child Query 1'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.name': 'gq:Child Query 1'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({'children.name': 'df:Child Query 1'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.name': 'lk:Child Query 1'})
      expect(rows.length).to.equal(3)

      rows = await customerModel.findByQuery({'children.name': 'lk:Child Query 12'})
      expect(rows.length).to.equal(2)

      rows = await customerModel.findByQuery({'children.name': 'lk:Child Query 123'})
      expect(rows.length).to.equal(1)

      rows = await customerModel.findByQuery({'children.name': 'lk:Child Query 1234'})
      expect(rows.length).to.equal(0)
    })
  })
})
