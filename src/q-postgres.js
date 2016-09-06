import {Pool} from 'pg'
import qOrm from 'orm'
import qTypes from 'orm/types'

export const orm = qOrm
export const types = qTypes

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
  const connection = {
    release: async () => client.release(),
    execute: runSql.bind(this, client),

    commit: async () => {
      await runSql(client, COMMIT)
      return connection
    },

    rollback: async () => {
      await runSql(client, ROLLBACK)
      return connection
    },

    startTransaction: async () => {
      await runSql(client, BEGIN)
      return connection
    }
  }

  return connection
}

export const pool = (config) => {
  const pool = new Pool(config)
  const connect = factoryConnection.bind(this, pool)
  return {connect}
}
