'use strict';

var q              = require('q');
var PgConnection   = require('./pg.connection');
var PostgresClient = require('pg').Client;

function PgPromise(user, pass, host, base) {
  var pgPromise = this;
  user = String(user);
  pass = String(pass);
  host = String(host);
  base = base && String(base).length ? '/'.concat(base) : '';

  var connString = 'postgres://'.concat(user, ':', pass, '@', host, base);

  pgPromise.connect = function() {
    return q.Promise(function(resolve, reject) {
      var postgresClient = new PostgresClient(connString);

      postgresClient.connect(function(err) {
        if (err) return reject(err);

        var pgConnection = new PgConnection(postgresClient);

        pgConnection
          .openTransaction()
          .then(resolve)
          .catch(reject);
      });
    });
  };
}

module.exports = PgPromise;
