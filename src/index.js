import {Pool} from 'pg'

const BEGIN = 'BEGIN'
const COMMIT = 'COMMIT'
const ROLLBACK = 'ROLLBACK'

const getConnection = async (pool) => {
  const client = await pool.connect()
  const {errno} = client
  if (errno) throw new Error(client.message)
  return client
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
  const client = await getConnection(pool)

  return {
    release: async () => client.release(),
    execute: runSql.bind(this, client),
    commit: runSql.bind(this, client, COMMIT),
    rollback: runSql.bind(this, client, ROLLBACK),
    startTransaction: runSql.bind(this, client, BEGIN)
  }
}

export default (config) => {
  const pool = new Pool(config)
  const connect = factoryConnection.bind(this, pool)
  return {connect}
}
