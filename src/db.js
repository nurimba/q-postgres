const BEGIN = 'BEGIN'
const COMMIT = 'COMMIT'
const ROLLBACK = 'ROLLBACK'

const getConnection = async (pool) => {
  const client = await pool.connect()
  const {errno} = client
  if (errno) throw new Error(client.message)
  return client
}

const runSql = (client, sql, parameters = []) => {
  return new Promise((resolve, reject) => {
    client.query(sql, parameters, (err, result) => {
      if (client.config.debug) {
        console.log(`
--------------------------
SQL => ${sql}

PARAMS => ${parameters.join(', ')}

ERROR => ${err}

RESULT => ${result}
--------------------------
        `)
      }

      if (err) return reject(err)
      resolve(result)
    })
  })
}

export default async (pool, config) => {
  const client = await getConnection(pool)
  client.config = config
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
