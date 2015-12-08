'use strict';

var Promise = require('q').Promise;

function PgWrapper(connection, releaseClient) {
  var pgWrapper = this;

  var BEGIN    = 'BEGIN';
  var COMMIT   = 'COMMIT';
  var ROLLBACK = 'ROLLBACK';

  pgWrapper.runScript = function(script) {
    return Promise(function(resolve, reject) {
      connection.query(script, function(err, result) {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };

  pgWrapper.openTransaction = function() {
    return pgWrapper.runScript(BEGIN).then(function() {
      return pgWrapper;
    });
  };

  pgWrapper.commit = function(res) {
    return pgWrapper.runScript(COMMIT).then(function() {
      return res;
    });
  };

  pgWrapper.rollback = function(error) {
    return pgWrapper.runScript(ROLLBACK).then(function() {
      throw error;
    });
  };

  pgWrapper.end = function() {
    return releaseClient();
  };
}

module.exports = PgWrapper;
