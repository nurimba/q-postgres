const BEGIN = 'BEGIN'
const COMMIT = 'COMMIT'
const ROLLBACK = 'ROLLBACK'

export default async (pool, config) => (
  pool.connect().then((client) => {
    client.config = config

    const connection = {
      release: () => client.release(true),
      execute: (sql, parameters = []) => client.query(sql, parameters),

      commit: () => client.query(COMMIT).then(() => connection),
      rollback: () => client.query(ROLLBACK).then(() => connection),
      startTransaction: () => client.query(BEGIN).then(() => connection)
    }

    return connection
  })
)
