import sqlInsert from '../../../../src/orm/sql/sqlInsert'

describe('orm', () => {
  describe('sqlInsert', () => {
    let schema, expect

    beforeEach(function () {
      expect = this.expect
      const {customerStructure} = this
      schema = {...customerStructure, data: {
        id: 'a1b2c3d4',
        name: 'Teste',
        age: 18,
        birthday: '1988-06-10',
        deleted: false
      }}
    })

    it('mount insert query of schema.', function () {
      const sql = sqlInsert(schema)
      const expectedQuery = `
INSERT INTO customers (id, name, age, birthday, deleted)
       VALUES ('a1b2c3d4', 'Teste', 18, '1988-06-10', false)
       RETURNING id, name, age, birthday, deleted;
`.trim()

      expect(sql).to.equal(expectedQuery)
    })

    it('mount insert query with returning full fields.', function () {
      delete schema.data.age
      const sql = sqlInsert(schema)
      const expectedQuery = `
INSERT INTO customers (id, name, birthday, deleted)
       VALUES ('a1b2c3d4', 'Teste', '1988-06-10', false)
       RETURNING id, name, age, birthday, deleted;
`.trim()

      expect(sql).to.equal(expectedQuery)
    })

    it('mount insert query ignore undefined or null fields.', function () {
      schema.data.age = undefined
      schema.data.birthday = null
      const sql = sqlInsert(schema)
      const expectedQuery = `
INSERT INTO customers (id, name, deleted)
       VALUES ('a1b2c3d4', 'Teste', false)
       RETURNING id, name, age, birthday, deleted;
`.trim()

      expect(sql).to.equal(expectedQuery)
    })
  })
})
