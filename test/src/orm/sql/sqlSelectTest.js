import sqlSelect from '../../../../src/orm/sql/sqlSelect'
import {types} from '../../../../src'
const {
  DATE,
  NAME,
  BOOLEAN,
  INTEGER,
  PRIMARY
} = types

describe('orm', () => {
  describe('sqlSelect', () => {
    let schema, expect

    beforeEach(function () {
      expect = this.expect
      const {customerSchema} = this
      schema = {
        ...customerSchema,
        select: [
          {field: 'id', type: PRIMARY},
          {field: 'name', type: NAME},
          {field: 'age', type: INTEGER},
          {field: 'birthday', type: DATE},
          {field: 'deleted', type: BOOLEAN}
        ]
      }
    })

    it('mount select query of schema.', function () {
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query COUNT with GROUP BY.', function () {
      schema.count = true
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT COUNT(-1) AS _counter, customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
GROUP BY customers.id, customers.name, customers.age, customers.birthday, customers.deleted`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query FUNCS with GROUP BY.', function () {
      schema.select = [
        {field: 'id', type: PRIMARY, func: 'MAX'},
        {field: 'age', type: INTEGER, func: 'AVG'},
        {field: 'birthday', type: DATE, func: 'MIN'},
        {field: 'deleted', type: BOOLEAN}
      ]
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT MAX(customers.id) AS maxId, AVG(customers.age) AS avgAge, MIN(customers.birthday) AS minBirthday, customers.deleted
FROM customers
GROUP BY customers.deleted`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query COUNT without GROUP BY.', function () {
      schema.select = schema.select.map(field => Object.assign(field, {select: false}))
      schema.count = true
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT COUNT(-1) AS _counter
FROM customers`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with AND conditions.', function () {
      schema.where = [
        {field: 'age', comparator: '=', value: 18},
        {field: 'name', comparator: 'like', value: 'test'},
        {field: 'deleted', comparator: '=', value: false},
        {field: 'birthday', comparator: '>', value: '2016-12-30'}
      ]

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
WHERE (customers.age = 18)
  AND (customers.name like 'test')
  AND (customers.deleted = false)
  AND (customers.birthday > '2016-12-30')`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with OR conditions.', function () {
      schema.where = [
        {or: [
          {field: 'age', comparator: '=', value: 18},
          {field: 'name', comparator: 'like', value: 'test'},
          {field: 'deleted', comparator: '=', value: false},
          {field: 'birthday', comparator: '>', value: '2016-12-30'}
        ]}
      ]

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
WHERE ((customers.age = 18)
    OR (customers.name like 'test')
    OR (customers.deleted = false)
    OR (customers.birthday > '2016-12-30'))`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with DISTINCT.', function () {
      schema.distinct = true
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT DISTINCT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with limit.', function () {
      schema.limit = 10
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
LIMIT 10`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with pagination with page number.', function () {
      schema.limit = 10
      schema.page = 2
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
LIMIT 10 OFFSET 10`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with pagination without page number.', function () {
      schema.limit = 10
      schema.page = 1
      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
LIMIT 10`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with ORDER BY.', function () {
      schema.orderBy = [
        {field: 'birthday', order: 'ASC'},
        {field: 'deleted', order: 'DESC'},
        {field: 'age', order: 'ASC'},
        {field: 'name', order: 'DESC'}
      ]

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
ORDER BY 4 ASC, 5 DESC, 3 ASC, 2 DESC`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with JOINS.', function () {
      schema.joins = [{
        tableRef: 'child',
        fieldRef: 'parent',
        tableLink: 'customers',
        fieldLink: 'id'
      }]

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
JOIN child ON (child.parent = customers.id)`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with fields of JOINS.', function () {
      schema.joins = [{
        tableRef: 'child',
        fieldRef: 'parent',
        tableLink: 'customers',
        fieldLink: 'id'
      }]

      schema.select.push(
        {table: 'customers', field: 'other1', type: NAME},
        {table: 'customers', field: 'other2', type: NAME},

        {table: 'child', field: 'id', type: PRIMARY},
        {table: 'child', field: 'name', type: NAME},
        {table: 'child', field: 'age', type: INTEGER},
        {table: 'child', field: 'birthday', type: DATE},
        {table: 'child', field: 'deleted', type: BOOLEAN}
      )

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted, customers.other1, customers.other2, child.id AS childId, child.name AS childName, child.age AS childAge, child.birthday AS childBirthday, child.deleted AS childDeleted
FROM customers
JOIN child ON (child.parent = customers.id)`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select full query with fields of JOINS.', function () {
      schema.joins = [{
        tableRef: 'child',
        fieldRef: 'parent',
        tableLink: 'customers',
        fieldLink: 'id'
      }]

      schema.select.push(
        {table: 'customers', field: 'other1', type: NAME},
        {table: 'customers', field: 'other2', type: NAME},

        {table: 'child', field: 'id', type: PRIMARY},
        {table: 'child', field: 'name', type: NAME},
        {table: 'child', field: 'age', type: INTEGER},
        {table: 'child', field: 'birthday', type: DATE},
        {table: 'child', field: 'deleted', type: BOOLEAN}
      )

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted, customers.other1, customers.other2, child.id AS childId, child.name AS childName, child.age AS childAge, child.birthday AS childBirthday, child.deleted AS childDeleted
FROM customers
JOIN child ON (child.parent = customers.id)`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select query with conditions.', function () {
      schema.joins = [{
        tableRef: 'childs',
        fieldRef: 'customer',
        tableLink: 'customers',
        fieldLink: 'id'
      }, {
        tableRef: 'events',
        fieldRef: 'child',
        tableLink: 'childs',
        fieldLink: 'id'
      }]

      schema.where = [
        {table: 'childs', field: 'age', comparator: '=', value: 18},
        {table: 'childs', field: 'name', comparator: 'like', value: 'test'},
        {table: 'childs', field: 'deleted', comparator: '=', value: false},
        {table: 'childs', field: 'birthday', comparator: '>', value: '2016-12-30'},
        {or: [
          {table: 'events', field: 'age', comparator: '=', value: 18},
          {table: 'events', field: 'name', comparator: 'like', value: 'test'},
          {table: 'events', field: 'deleted', comparator: '=', value: false},
          {table: 'events', field: 'birthday', comparator: '>', value: '2016-12-30'}
        ]}
      ]

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT customers.id, customers.name, customers.age, customers.birthday, customers.deleted
FROM customers
JOIN childs ON (childs.customer = customers.id)
JOIN events ON (events.child = childs.id)
WHERE (childs.age = 18)
  AND (childs.name like 'test')
  AND (childs.deleted = false)
  AND (childs.birthday > '2016-12-30')
  AND ((events.age = 18)
    OR (events.name like 'test')
    OR (events.deleted = false)
    OR (events.birthday > '2016-12-30'))`.trim()
      expect(sql).to.equal(expectedQuery)
    })

    it('mount select full query.', function () {
      const schema = {
        distinct: true,
        count: true,
        limit: 10,
        page: 2,
        table: 'customers',

        select: [
          {field: 'id', type: PRIMARY},
          {field: 'name', type: NAME},
          {field: 'age', type: INTEGER, func: 'MAX'},
          {field: 'birthday', type: DATE, func: 'MIN'},
          {field: 'deleted', type: BOOLEAN},
          {table: 'customers', field: 'other1', type: NAME},
          {table: 'customers', field: 'other2', type: NAME},

          {table: 'childs', field: 'id', type: PRIMARY},
          {table: 'childs', field: 'name', type: NAME},
          {table: 'childs', field: 'age', type: INTEGER, func: 'MAX'},
          {table: 'childs', field: 'birthday', type: DATE, func: 'MIN'},
          {table: 'childs', field: 'deleted', type: BOOLEAN},

          {table: 'events', field: 'id', type: PRIMARY},
          {table: 'events', field: 'name', type: NAME},
          {table: 'events', field: 'age', type: INTEGER, func: 'AVG'},
          {table: 'events', field: 'birthday', type: DATE, func: 'AVG'},
          {table: 'events', field: 'deleted', type: BOOLEAN}
        ],

        joins: [{
          tableRef: 'childs',
          fieldRef: 'customer',
          tableLink: 'customers',
          fieldLink: 'id'
        }, {
          tableRef: 'events',
          fieldRef: 'child',
          tableLink: 'childs',
          fieldLink: 'id'
        }],

        where: [
          {field: 'age', comparator: '=', value: 18},
          {field: 'name', comparator: 'like', value: 'test'},
          {field: 'deleted', comparator: '=', value: false},
          {field: 'birthday', comparator: '>', value: '2016-12-30'},

          {table: 'childs', field: 'age', comparator: '=', value: 18},
          {table: 'childs', field: 'name', comparator: 'like', value: 'test'},
          {table: 'childs', field: 'deleted', comparator: '=', value: false},
          {table: 'childs', field: 'birthday', comparator: '>', value: '2016-12-30'},

          {or: [
            {table: 'events', field: 'age', comparator: '=', value: 18},
            {table: 'events', field: 'name', comparator: 'like', value: 'test'},
            {table: 'events', field: 'deleted', comparator: '=', value: false},
            {table: 'events', field: 'birthday', comparator: '>', value: '2016-12-30'}
          ]},

          {and: [
            {table: 'events', field: 'age', comparator: '=', value: 18},
            {table: 'events', field: 'name', comparator: 'like', value: 'test'},
            {table: 'events', field: 'deleted', comparator: '=', value: false},
            {table: 'events', field: 'birthday', comparator: '>', value: '2016-12-30'}
          ]}
        ],

        orderBy: [
          {field: 'birthday', order: 'ASC'},
          {field: 'deleted', order: 'DESC'},
          {field: 'age', order: 'ASC'},
          {field: 'name', order: 'DESC'},

          {table: 'childs', field: 'age', order: 'ASC'},
          {table: 'childs', field: 'name', order: 'ASC'},
          {table: 'childs', field: 'deleted', order: 'ASC'},
          {table: 'childs', field: 'birthday', order: 'ASC'},

          {table: 'events', field: 'age'},
          {table: 'events', field: 'name'},
          {table: 'events', field: 'deleted'},
          {table: 'events', field: 'birthday'},
          {table: 'events', field: 'other'},
          {table: 'events', field: 'other2', order: 'DESC'}
        ]
      }

      const sql = sqlSelect(schema)
      const expectedQuery = `
SELECT COUNT(-1) AS _counter, customers.id, customers.name, MAX(customers.age) AS maxAge, MIN(customers.birthday) AS minBirthday, customers.deleted, customers.other1, customers.other2, childs.id AS childsId, childs.name AS childsName, MAX(childs.age) AS maxChildsAge, MIN(childs.birthday) AS minChildsBirthday, childs.deleted AS childsDeleted, events.id AS eventsId, events.name AS eventsName, AVG(events.age) AS avgEventsAge, AVG(events.birthday) AS avgEventsBirthday, events.deleted AS eventsDeleted
FROM customers
JOIN childs ON (childs.customer = customers.id)
JOIN events ON (events.child = childs.id)
WHERE (customers.age = 18)
  AND (customers.name like 'test')
  AND (customers.deleted = false)
  AND (customers.birthday > '2016-12-30')
  AND (childs.age = 18)
  AND (childs.name like 'test')
  AND (childs.deleted = false)
  AND (childs.birthday > '2016-12-30')
  AND ((events.age = 18)
    OR (events.name like 'test')
    OR (events.deleted = false)
    OR (events.birthday > '2016-12-30'))
  AND ((events.age = 18)
   AND (events.name like 'test')
   AND (events.deleted = false)
   AND (events.birthday > '2016-12-30'))
GROUP BY customers.id, customers.name, customers.deleted, customers.other1, customers.other2, childs.id, childs.name, childs.deleted, events.id, events.name, events.deleted
ORDER BY 5 ASC, 6 DESC, 4 ASC, 3 DESC, 11 ASC, 10 ASC, 13 ASC, 12 ASC, 16, 15, 18, 17, events.other, events.other2 DESC
LIMIT 10 OFFSET 10`.trim()
      expect(sql).to.equal(expectedQuery)
    })
  })
})
