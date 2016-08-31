import sqlDelete from '../../../../src/orm/sql/sqlDelete'

describe('orm', () => {
  describe('sqlDelete', () => {
    let schema, expect

    beforeEach(function () {
      expect = this.expect
      const {customerSchema} = this
      schema = {
        ...customerSchema,
        where: [{field: 'id', comparator: '=', value: 10001}]
      }
    })

    it('mount delete query of schema.', function () {
      const sql = sqlDelete(schema)
      const expectedQuery = `
DELETE FROM customers
WHERE (customers.id = 10001);
`.trim()

      expect(sql).to.equal(expectedQuery)
    })
  })
})
