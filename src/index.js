import {Pool} from 'pg'
import orm from 'orm'
import database from 'db'

export default (config) => {
  const pool = new Pool(config)
  const connect = database.bind(this, pool)
  return {connect, orm}
}
