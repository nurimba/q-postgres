'use strict';

var q = require('q');

function PgConnection(connection) {
  var pgConnection = this;

  const BEGIN    = 'BEGIN';
  const COMMIT   = 'COMMIT';
  const ROLLBACK = 'ROLLBACK';

  pgConnection.runScript = function(script) {
    return q.Promise(function(resolve, reject) {
      connection.query(script, function(err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  pgConnection.openTransaction = function() {
    return pgConnection.runScript(BEGIN).then(function() {
      return pgConnection;
    });
  };

  pgConnection.commit = function(res) {
    return pgConnection.runScript(COMMIT).then(function() {
      return res;
    });
  };

  pgConnection.rollback = function(error) {
    return pgConnection.runScript(ROLLBACK).then(function() {
      throw error;
    });
  };
}

module.exports = PgConnection;
