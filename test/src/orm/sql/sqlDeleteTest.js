import sqlDelete from '../../../../src/orm/sql/sqlDelete'

describe('orm', () => {
  describe('sqlDelete', () => {
    let schema, expect

    beforeEach(function () {
      expect = this.expect
      const {customerStructure} = this
      schema = {...customerStructure, where: [
        {field: 'id', comparator: '=', value: 'a1b2c3d4'}
      ]}
    })

    it('mount delete query of schema.', function () {
      const sql = sqlDelete(schema)
      const expectedQuery = `
DELETE FROM customers
WHERE (customers.id = 'a1b2c3d4');
`.trim()

      expect(sql).to.equal(expectedQuery)
    })
  })
})
