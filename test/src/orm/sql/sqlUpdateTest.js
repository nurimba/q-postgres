import sqlUpdate from '../../../../src/orm/sql/sqlUpdate'

describe('orm', () => {
  describe('sqlUpdate', () => {
    let schema, expect

    beforeEach(function () {
      expect = this.expect
      const {customerStructure} = this
      schema = {...customerStructure, data: {
        name: 'Teste',
        age: 18,
        birthday: '1988-06-10',
        deleted: false
      },

      where: [
        {field: 'id', comparator: '=', value: 'a1b2c3d4'}
      ]}
    })

    it('mount update query of schema.', function () {
      const sql = sqlUpdate(schema)
      const expectedQuery = `
UPDATE customers
  SET name = 'Teste',
      age = 18,
      birthday = '1988-06-10',
      deleted = false
  WHERE (customers.id = 'a1b2c3d4')
  RETURNING id, name, age, birthday, deleted;
`
      expect(sql).to.equal(expectedQuery.trim())
    })

    it('mount update query with returning full fields.', function () {
      delete schema.data.age
      const sql = sqlUpdate(schema)
      const expectedQuery = `
UPDATE customers
  SET name = 'Teste',
      birthday = '1988-06-10',
      deleted = false
  WHERE (customers.id = 'a1b2c3d4')
  RETURNING id, name, age, birthday, deleted;
  `
      expect(sql).to.equal(expectedQuery.trim())
    })

    it('mount insert query ignore undefined or null fields.', function () {
      schema.data.age = undefined
      schema.data.birthday = null
      const sql = sqlUpdate(schema)
      const expectedQuery = `
UPDATE customers
  SET name = 'Teste',
      birthday = null,
      deleted = false
  WHERE (customers.id = 'a1b2c3d4')
  RETURNING id, name, age, birthday, deleted;
`
      expect(sql).to.equal(expectedQuery.trim())
    })
  })
})