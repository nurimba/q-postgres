'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var BEGIN = 'BEGIN';
var COMMIT = 'COMMIT';
var ROLLBACK = 'ROLLBACK';

var getConnection = function getConnection(pool) {
  return new Promise(function (resolve, reject) {
    pool.connect(function (err, client, release) {
      if (err) return reject(err);
      resolve({ client: client, release: release });
    });
  });
};

var runSql = function runSql(client, sql) {
  return new Promise(function (resolve, reject) {
    client.query(sql, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

var factoryConnection = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pool) {
    var _ref2, client, release;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getConnection(pool);

          case 2:
            _ref2 = _context.sent;
            client = _ref2.client;
            release = _ref2.release;
            return _context.abrupt('return', {
              release: release,
              execute: runSql.bind(client),
              commit: runSql.bind(client, COMMIT),
              rollback: runSql.bind(client, ROLLBACK),
              startTransaction: runSql.bind(client, BEGIN)
            });

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function factoryConnection(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = function (config) {
  var pool = new _pg.Pool(config);
  var connect = factoryConnection.bind(undefined, pool);
  return { connect: connect };
};