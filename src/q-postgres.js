import {Pool} from 'pg'

const BEGIN = 'BEGIN'
const COMMIT = 'COMMIT'
const ROLLBACK = 'ROLLBACK'

const getConnection = (pool) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      if (err) return reject(err)
      resolve({client, release})
    })
  })
}

const runSql = (client, sql) => {
  return new Promise((resolve, reject) => {
    client.query(sql, (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const factoryConnection = async (pool) => {
  const {client, release} = await getConnection(pool)
  return {
    release,
    execute: runSql.bind(client),
    commit: runSql.bind(client, COMMIT),
    rollback: runSql.bind(client, ROLLBACK),
    startTransaction: runSql.bind(client, BEGIN)
  }
}

export default (config) => {
  const pool = new Pool(config)
  const connect = factoryConnection.bind(this, pool)
  return {connect}
}
