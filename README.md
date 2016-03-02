# q-postgres
Postgres with promises.


### Sample
```javascript
var env = process.env.NODE_ENV || 'development';
var props = require('./server.json')[env];
var db = props.db;

var poolPostgres = new qPostgres(db.user, db.pass, db.host, db.base, process.env.DATABASE_URL);

//Get connection from pool
poolPostgres.connect().then(function(connection) {
  //open transaction
  return connection.openTransaction().then(createTableMigrations).then(function(transaction) {
    var sql = 'SELECT * FROM table_name';
    return transaction.runScript(sql).then(function(res) {
      //commit transaction
      returm transaction.commit().then(function() {
        //Promise result
        return res.rows;
      });
    }).catch(transaction.rollback); //rollback transaction
  }).then(function() {
    connection.end(); //Leave connection from pool
  });
});
```
