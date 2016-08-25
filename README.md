# q-postgres
Postgres with promises.

### Sample ES6
```javascript
import qPostgres from 'q-postgres'

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config = {
  user: 'foo', //env var: PGUSER
  database: 'my_db', //env var: PGDATABASE
  password: 'secret', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
}

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
const pool = qPostgres(config)

try {
  // to run a query we can acquire a client from the pool,
  // run a query on the client, and then return the client to the pool
  const client = await pool.connect()

  // Start transaction
  await client.startTransaction()

  // Execute SQL of searches
  const {rows} = await client.execute('SELECT * FROM customers')

  // Execute SQL of inserts
  const {rows} = await client.execute('INSERT INTO customers (name, birthday) VALUES ("Test", "1988-06-10")')

  // Execute SQL of updates
  const {rows} = await client.execute('UPDATE customers SET name = "Test", birthday = "1988-06-10" WHERE (id = 1)')

  // Execute SQL of deletes
  const {rows} = await client.execute('DELETE FROM customers WHERE (id = 1)')

  // Commit transaction
  await client.commit()

  // Or rollback transaction
  await client.rollback()

  // release the client back to the pool
  await client.release()
} catch (error) {
  console.log(error)
}
```

### Sample ES5
```javascript
var qPostgres = rquire('q-postgres');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'foo', //env var: PGUSER
  database: 'my_db', //env var: PGDATABASE
  password: 'secret', //env var: PGPASSWORD
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = qPostgres(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect().then(function(var client) {
  // Start transaction
  var operation = client.startTransaction();

  // Execute commands sql
  operation = operation.then(function() {
    var sqlSelect = 'SELECT * FROM customers';
    var sqlInsert = 'INSERT INTO customers (name, birthday) VALUES ("Test", "1988-06-10")';
    var sqlUpdate = 'UPDATE customers SET name = "Test", birthday = "1988-06-10" WHERE (id = 1)';
    var sqlDelete = 'DELETE FROM customers WHERE (id = 1)';

    return Promise.all([
      client.execute(sqlSelect),
      client.execute(sqlInsert),
      client.execute(sqlUpdate),
      client.execute(sqlDelete)
    ]);
  });

  // Commit transaction
  operation = operation.then(function(results) {
    console.log(results);
    return client.commit();
  });

  // Rollback transaction
  operation = operation.catch(function(error) {
    console.log(error);
    return client.rollback();
  });

  // release the client back to the pool
  operation.then(function() {
    return client.release();
  });
});
```
