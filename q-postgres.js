'use strict';

var q = require('q');
var Postgres  = require('pg');
var PgWrapper = require('./pg.wrapper');

function PgPromise(user, pass, host, base, url) {
  var pgPromise = this;
  var connString = url;

  if (!url) {
    user = String(user);
    pass = String(pass);
    host = String(host);
    base = base && String(base).length ? '/'.concat(base) : '';
    connString = 'pg://'.concat(user, ':', pass, '@', host, base);
  }

  pgPromise.connect = function() {
    return q.Promise(function(resolve, reject) {
      Postgres.connect(connString, function(err, client, done) {
        if (err) {
          reject(err);
          return done();
        }

        var pgWrapper = new PgWrapper(client, done);
        resolve(pgWrapper);
      });
    });
  };
}

module.exports = PgPromise;
