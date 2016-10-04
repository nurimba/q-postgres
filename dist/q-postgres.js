module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.genSQL = exports.types = undefined;

	var _pg = __webpack_require__(28);

	var _orm = __webpack_require__(23);

	var _orm2 = _interopRequireDefault(_orm);

	var _db = __webpack_require__(13);

	var _db2 = _interopRequireDefault(_db);

	var _types = __webpack_require__(5);

	var _types2 = _interopRequireDefault(_types);

	var _gen = __webpack_require__(4);

	var _gen2 = _interopRequireDefault(_gen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var types = exports.types = _types2.default;
	var genSQL = exports.genSQL = _gen2.default;

	exports.default = function (config) {
	  var pool = new _pg.Pool(config);
	  var connect = _db2.default.bind(undefined, pool, config);
	  return { connect: connect, orm: _orm2.default, pool: pool };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectTable = exports.deleteTable = exports.updateTable = exports.insertTable = exports.createTable = exports.alterTable = exports.dropTable = undefined;

	var _dropTable = __webpack_require__(17);

	var _dropTable2 = _interopRequireDefault(_dropTable);

	var _alterTable = __webpack_require__(14);

	var _alterTable2 = _interopRequireDefault(_alterTable);

	var _createTable = __webpack_require__(15);

	var _createTable2 = _interopRequireDefault(_createTable);

	var _insertTable = __webpack_require__(18);

	var _insertTable2 = _interopRequireDefault(_insertTable);

	var _updateTable = __webpack_require__(20);

	var _updateTable2 = _interopRequireDefault(_updateTable);

	var _deleteTable = __webpack_require__(16);

	var _deleteTable2 = _interopRequireDefault(_deleteTable);

	var _selectTable = __webpack_require__(19);

	var _selectTable2 = _interopRequireDefault(_selectTable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var dropTable = exports.dropTable = _dropTable2.default;
	var alterTable = exports.alterTable = _alterTable2.default;
	var createTable = exports.createTable = _createTable2.default;
	var insertTable = exports.insertTable = _insertTable2.default;
	var updateTable = exports.updateTable = _updateTable2.default;
	var deleteTable = exports.deleteTable = _deleteTable2.default;
	var selectTable = exports.selectTable = _selectTable2.default;

	exports.default = {
	  dropTable: dropTable,
	  alterTable: alterTable,
	  createTable: createTable,
	  insertTable: insertTable,
	  updateTable: updateTable,
	  deleteTable: deleteTable,
	  selectTable: selectTable
		};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TEXT = exports.TEXT = 'TEXT';
	var CITEXT = exports.CITEXT = 'CITEXT';
	var NAME = exports.NAME = 'VARCHAR(255)';
	var DATE = exports.DATE = 'DATE';
	var JSON = exports.JSON = 'JSON';
	var CHAR1 = exports.CHAR1 = 'CHAR(1)';
	var CHAR2 = exports.CHAR2 = 'CHAR(2)';
	var CHAR8 = exports.CHAR8 = 'CHAR(8)';
	var EMAIL = exports.EMAIL = 'VARCHAR(50)';
	var PHONE = exports.PHONE = 'VARCHAR(30)';
	var MONEY = exports.MONEY = 'NUMERIC(15,2)';
	var STRING = exports.STRING = 'VARCHAR(255)';
	var SELECT = exports.SELECT = 'VARCHAR(25)';
	var BOOLEAN = exports.BOOLEAN = 'BOOLEAN';
	var INTEGER = exports.INTEGER = 'INTEGER';
	var SMALLINT = exports.SMALLINT = 'SMALLINT';
	var CPFCNPJ = exports.CPFCNPJ = 'VARCHAR(14)';
	var PERCENT = exports.PERCENT = 'NUMERIC(15,8)';
	var PRIMARY = exports.PRIMARY = 'SERIAL PRIMARY KEY';
	var DATETIME = exports.DATETIME = 'TIMESTAMP';
	var REFERENCES = exports.REFERENCES = 'REFERENCES';
	var NOT_NULL = exports.NOT_NULL = 'NOT NULL';

	exports.default = {
	  TEXT: TEXT,
	  DATE: DATE,
	  JSON: JSON,
	  NAME: NAME,
	  CHAR1: CHAR1,
	  CHAR2: CHAR2,
	  CHAR8: CHAR8,
	  EMAIL: EMAIL,
	  PHONE: PHONE,
	  MONEY: MONEY,
	  STRING: STRING,
	  SELECT: SELECT,
	  CITEXT: CITEXT,
	  BOOLEAN: BOOLEAN,
	  INTEGER: INTEGER,
	  CPFCNPJ: CPFCNPJ,
	  PERCENT: PERCENT,
	  PRIMARY: PRIMARY,
	  DATETIME: DATETIME,
	  SMALLINT: SMALLINT,
	  NOT_NULL: NOT_NULL,
	  REFERENCES: REFERENCES
		};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/defineProperty");

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var comparators = {
	  'eq': '=', // equal
	  'lt': '<', // less than
	  'gt': '>', // greater than
	  'lq': '<=', // less or equal
	  'gq': '>=', // greater or equal
	  'df': '<>', // diference
	  'lk': 'like', // = like by argument
	  '==': '=', // equal
	  '<<': '<', // less than
	  '>>': '>', // greater than
	  '<=': '<=', // less or equal
	  '>=': '>=', // greater or equal
	  '<>': '<>', // diference
	  '%%': 'like' // = like by argument
	};

	exports.default = function (value) {
	  var comparator = comparators['eq'];
	  if (typeof value !== 'string') return { comparator: comparator, value: value };
	  var partsValue = value.split(':');
	  var compVal = partsValue.shift();
	  if (!comparators.hasOwnProperty(compVal)) return { comparator: comparator, value: value };
	  comparator = comparators[compVal];
	  var val = partsValue.join(':').trim();
	  return {
	    comparator: comparator,
	    value: comparator === 'like' ? '%' + val + '%' : val
	  };
		};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.formatInteger = exports.formatFloat = exports.formatDate = undefined;

	var _defineProperty2 = __webpack_require__(7);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _assign = __webpack_require__(6);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _types = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var formatDate = exports.formatDate = function formatDate(value) {
	  if (!value || !String(value).trim()) return null;
	  var dt = new Date(value);
	  var day = ('0' + dt.getDate()).substr(-2);
	  var mon = ('0' + (dt.getMonth() + 1)).substr(-2);
	  return dt.getFullYear() + '-' + mon + '-' + day;
	};

	var formatFloat = exports.formatFloat = function formatFloat(value) {
	  if (!value || !String(value).trim()) return null;
	  return parseFloat(value);
	};

	var formatInteger = exports.formatInteger = function formatInteger(value) {
	  if (!value || !String(value).trim()) return null;
	  return parseInt(value, 10);
	};

	exports.default = function (schema, row) {
	  var data = {};

	  (0, _keys2.default)(schema.fields).forEach(function (field) {
	    var value = row[field.toLowerCase()];
	    if (schema.fields[field] === _types.DATE) value = formatDate(value);
	    if ([_types.MONEY, _types.PERCENT].indexOf(schema.fields[field]) > -1) value = formatFloat(value);
	    if ([_types.INTEGER, _types.REFERENCES].indexOf(schema.fields[field]) > -1) value = formatInteger(value);
	    (0, _assign2.default)(data, (0, _defineProperty3.default)({}, field, value));
	  });

	  return data;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(3);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _gen = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (connection, schema) {
	  for (var _len = arguments.length, fields = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    fields[_key - 2] = arguments[_key];
	  }

	  if (!fields || !fields.length) fields = (0, _keys2.default)(schema.fields);
	  var selectCommand = (0, _gen.selectTable)();
	  selectCommand.from(schema.table);
	  fields.forEach(function (field) {
	    return selectCommand.field(field);
	  });

	  selectCommand.run = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var whereConditions, selectSQL;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            whereConditions = selectCommand.values;
	            selectSQL = selectCommand.toSQL();
	            return _context.abrupt('return', connection.execute(selectSQL, whereConditions));

	          case 3:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return selectCommand;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(11);

	var _promise2 = _interopRequireDefault(_promise);

	var _regenerator = __webpack_require__(3);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BEGIN = 'BEGIN';
	var COMMIT = 'COMMIT';
	var ROLLBACK = 'ROLLBACK';

	var getConnection = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(pool) {
	    var client, errno;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return pool.connect();

	          case 2:
	            client = _context.sent;
	            errno = client.errno;

	            if (!errno) {
	              _context.next = 6;
	              break;
	            }

	            throw new Error(client.message);

	          case 6:
	            return _context.abrupt('return', client);

	          case 7:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function getConnection(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var runSql = function runSql(client, sql) {
	  var parameters = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	  return new _promise2.default(function (resolve, reject) {
	    client.query(sql, parameters, function (err, result) {
	      if (client.config.debug) console.log('                          ');
	      if (client.config.debug) console.log('--------------------------');
	      if (client.config.debug) console.log(sql);
	      if (client.config.debug && sql) console.log(sql);
	      if (client.config.debug && parameters) console.log(parameters);
	      if (client.config.debug && err) console.log('ERROR: ', err);
	      if (client.config.debug && result) console.log('RESULT: ', result);
	      if (client.config.debug) console.log('--------------------------');
	      if (client.config.debug) console.log('                          ');
	      if (err) return reject(err);
	      resolve(result);
	    });
	  });
	};

	exports.default = function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(pool, config) {
	    var client, connection;
	    return _regenerator2.default.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.next = 2;
	            return getConnection(pool);

	          case 2:
	            client = _context6.sent;

	            client.config = config;
	            connection = {
	              release: function () {
	                var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	                  return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                      switch (_context2.prev = _context2.next) {
	                        case 0:
	                          return _context2.abrupt('return', client.release());

	                        case 1:
	                        case 'end':
	                          return _context2.stop();
	                      }
	                    }
	                  }, _callee2, undefined);
	                }));

	                return function release() {
	                  return _ref3.apply(this, arguments);
	                };
	              }(),
	              execute: runSql.bind(undefined, client),

	              commit: function () {
	                var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
	                  return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                      switch (_context3.prev = _context3.next) {
	                        case 0:
	                          _context3.next = 2;
	                          return runSql(client, COMMIT);

	                        case 2:
	                          return _context3.abrupt('return', connection);

	                        case 3:
	                        case 'end':
	                          return _context3.stop();
	                      }
	                    }
	                  }, _callee3, undefined);
	                }));

	                return function commit() {
	                  return _ref4.apply(this, arguments);
	                };
	              }(),

	              rollback: function () {
	                var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
	                  return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                      switch (_context4.prev = _context4.next) {
	                        case 0:
	                          _context4.next = 2;
	                          return runSql(client, ROLLBACK);

	                        case 2:
	                          return _context4.abrupt('return', connection);

	                        case 3:
	                        case 'end':
	                          return _context4.stop();
	                      }
	                    }
	                  }, _callee4, undefined);
	                }));

	                return function rollback() {
	                  return _ref5.apply(this, arguments);
	                };
	              }(),

	              startTransaction: function () {
	                var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
	                  return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                      switch (_context5.prev = _context5.next) {
	                        case 0:
	                          _context5.next = 2;
	                          return runSql(client, BEGIN);

	                        case 2:
	                          return _context5.abrupt('return', connection);

	                        case 3:
	                        case 'end':
	                          return _context5.stop();
	                      }
	                    }
	                  }, _callee5, undefined);
	                }));

	                return function startTransaction() {
	                  return _ref6.apply(this, arguments);
	                };
	              }()
	            };
	            return _context6.abrupt('return', connection);

	          case 6:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, undefined);
	  }));

	  return function (_x3, _x4) {
	    return _ref2.apply(this, arguments);
	  };
	}();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(12);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _types = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakline = '\n';

	var addColumn = function addColumn(orm, _ref, field, type, notNull, defaultValue) {
	  var adds = _ref.adds;

	  var setNull = '';
	  var defaultVal = '';
	  if (notNull) setNull = ' NOT NULL';
	  if (defaultValue !== undefined) {
	    defaultVal = ['boolean', 'number', ''].indexOf(typeof defaultValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(defaultValue)) > -1 ? ' DEFAULT ' + String(defaultValue).toUpperCase() : ' DEFAULT \'' + defaultValue + '\'';
	  }

	  adds.push('ADD COLUMN ' + field + ' ' + (type === _types.REFERENCES ? _types.INTEGER : type) + setNull + defaultVal);
	  return orm;
	};

	var dropColumn = function dropColumn(orm, _ref2, field) {
	  var drops = _ref2.drops;

	  drops.push('DROP COLUMN ' + field + ' RESTRICT');
	  return orm;
	};

	var dropDefault = function dropDefault(orm, _ref3, field) {
	  var alters = _ref3.alters;

	  alters.push('ALTER COLUMN ' + field + ' DROP DEFAULT');
	  return orm;
	};

	var setDefault = function setDefault(orm, _ref4, field, defaultValue) {
	  var alters = _ref4.alters;

	  var defaultVal = '';
	  if (defaultValue !== undefined) {
	    defaultVal = ['boolean', 'number', ''].indexOf(typeof defaultValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(defaultValue)) > -1 ? '' + String(defaultValue).toUpperCase() : '\'' + defaultValue + '\'';
	  }

	  alters.push('ALTER COLUMN ' + field + ' SET DEFAULT ' + defaultVal);
	  return orm;
	};

	var toSQL = function toSQL(_ref5) {
	  var tableName = _ref5.tableName;
	  var adds = _ref5.adds;
	  var alters = _ref5.alters;
	  var drops = _ref5.drops;
	  var indexs = _ref5.indexs;
	  return ('\nALTER TABLE ' + tableName + ' (\n  ' + adds.concat(alters, drops, indexs).join(',' + breakline + '  ') + '\n);\n').trim();
	};

	var setType = function setType(orm, _ref6, field, type) {
	  var alters = _ref6.alters;

	  alters.push('ALTER COLUMN ' + field + ' TYPE ' + (type === _types.REFERENCES ? _types.INTEGER : type));
	  return orm;
	};

	var dropNotNull = function dropNotNull(orm, _ref7, field) {
	  var alters = _ref7.alters;

	  alters.push('ALTER COLUMN ' + field + ' DROP NOT NULL');
	  return orm;
	};

	var setNotNull = function setNotNull(orm, _ref8, field) {
	  var alters = _ref8.alters;

	  alters.push('ALTER COLUMN ' + field + ' SET NOT NULL');
	  return orm;
	};

	var renameColumn = function renameColumn(orm, _ref9, field, newName) {
	  var alters = _ref9.alters;

	  alters.push('RENAME COLUMN ' + field + ' TO ' + newName);
	  return orm;
	};

	var addUnique = function addUnique(orm, _ref10, field) {
	  var tableName = _ref10.tableName;
	  var indexs = _ref10.indexs;

	  indexs.push('ADD CONSTRAINT unique_' + tableName + '_' + field + ' UNIQUE (' + field + ')');
	  return orm;
	};

	var dropUnique = function dropUnique(orm, _ref11, field) {
	  var tableName = _ref11.tableName;
	  var indexs = _ref11.indexs;

	  indexs.push('DROP CONSTRAINT unique_' + tableName + '_' + field);
	  return orm;
	};

	var addForeign = function addForeign(orm, _ref12, field, table, ref) {
	  var tableName = _ref12.tableName;
	  var indexs = _ref12.indexs;

	  indexs.push('ADD CONSTRAINT foreign_' + tableName + '_' + field + ' FOREIGN KEY (' + field + ') REFERENCES ' + table + ' (' + (!ref ? 'id' : ref) + ')');
	  return orm;
	};

	var dropForeign = function dropForeign(orm, _ref13, field) {
	  var tableName = _ref13.tableName;
	  var indexs = _ref13.indexs;

	  indexs.push('DROP CONSTRAINT foreign_' + tableName + '_' + field);
	  return orm;
	};

	exports.default = function (tableName) {
	  var schema = { tableName: tableName, adds: [], drops: [], alters: [], indexs: [] };
	  var orm = {};
	  orm.toSQL = toSQL.bind(undefined, schema);
	  orm.setType = setType.bind(undefined, orm, schema);
	  orm.addColumn = addColumn.bind(undefined, orm, schema);
	  orm.addUnique = addUnique.bind(undefined, orm, schema);
	  orm.dropUnique = dropUnique.bind(undefined, orm, schema);
	  orm.dropColumn = dropColumn.bind(undefined, orm, schema);
	  orm.setDefault = setDefault.bind(undefined, orm, schema);
	  orm.setNotNull = setNotNull.bind(undefined, orm, schema);
	  orm.dropNotNull = dropNotNull.bind(undefined, orm, schema);
	  orm.dropDefault = dropDefault.bind(undefined, orm, schema);
	  orm.renameColumn = renameColumn.bind(undefined, orm, schema);
	  orm.addForeign = addForeign.bind(undefined, orm, schema);
	  orm.dropForeign = dropForeign.bind(undefined, orm, schema);
	  return orm;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(12);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _types = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakline = '\n';

	var column = function column(orm, _ref, field, type, notNull, defaultValue) {
	  var columns = _ref.columns;

	  var setNull = '';
	  var defaultVal = '';
	  if (notNull) setNull = ' NOT NULL';
	  if (defaultValue !== undefined) {
	    defaultVal = ['boolean', 'number', ''].indexOf(typeof defaultValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(defaultValue)) > -1 ? ' DEFAULT ' + String(defaultValue).toUpperCase() : ' DEFAULT \'' + defaultValue + '\'';
	  }

	  columns.push(field + ' ' + (type === _types.REFERENCES ? _types.INTEGER : type) + setNull + defaultVal);
	  return orm;
	};

	var unique = function unique(orm, _ref2, field) {
	  var tableName = _ref2.tableName;
	  var uniques = _ref2.uniques;

	  uniques.push('CONSTRAINT unique_' + tableName + '_' + field + ' UNIQUE (' + field + ')');
	  return orm;
	};

	var foreign = function foreign(orm, _ref3, field, table, ref) {
	  var tableName = _ref3.tableName;
	  var foreigns = _ref3.foreigns;

	  foreigns.push('CONSTRAINT foreign_' + tableName + '_' + field + ' FOREIGN KEY (' + field + ') REFERENCES ' + table + ' (' + (!ref ? 'id' : ref) + ')');
	  return orm;
	};

	var toSQL = function toSQL(_ref4) {
	  var tableName = _ref4.tableName;
	  var columns = _ref4.columns;
	  var uniques = _ref4.uniques;
	  var foreigns = _ref4.foreigns;
	  return ('\nCREATE TABLE ' + tableName + ' (\n  ' + columns.concat(uniques, foreigns).join(',' + breakline + '  ') + '\n);\n').trim();
	};

	exports.default = function (tableName) {
	  var schema = { tableName: tableName, columns: [], uniques: [], foreigns: [] };
	  var orm = {};
	  orm.toSQL = toSQL.bind(undefined, schema);
	  orm.unique = unique.bind(undefined, orm, schema);
	  orm.column = column.bind(undefined, orm, schema);
	  orm.foreign = foreign.bind(undefined, orm, schema);
	  return orm;
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _comparatorWhere = __webpack_require__(8);

	var _comparatorWhere2 = _interopRequireDefault(_comparatorWhere);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakline = '\n';

	var toSQL = function toSQL(orm) {
	  var schema = orm.schema;
	  var conditions = orm.conditions;
	  var table = schema.table;
	  var fields = schema.fields;

	  var sqlWhere = conditions && conditions.length ? breakline + 'WHERE (' + conditions.join(')' + breakline + '  AND (') + ')' : '';

	  return ('\nDELETE FROM ' + table + sqlWhere + '\nRETURNING ' + (0, _keys2.default)(fields).join(', ') + ';\n').trim();
	};

	var objValues = function objValues(orm, conditions) {
	  orm.values = [];
	  orm.conditions = (0, _keys2.default)(conditions || {}).map(function (field, index) {
	    var _comWhere = (0, _comparatorWhere2.default)(conditions[field]);

	    var comparator = _comWhere.comparator;
	    var value = _comWhere.value;

	    orm.values.push(value);
	    return field + ' ' + comparator + ' $' + (index + 1);
	  });

	  return orm;
	};

	exports.default = function (schema) {
	  var orm = { schema: schema, values: [], conditions: [] };

	  orm.toSQL = toSQL.bind(undefined, orm);
	  orm.objValues = objValues.bind(undefined, orm);

	  return orm;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var toSQL = function toSQL(tableName) {
	  return ("\nDROP TABLE " + tableName + ";\n").trim();
	};

	exports.default = function (tableName) {
	  var orm = {};
	  orm.toSQL = toSQL.bind(undefined, tableName);
	  return orm;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toSQL = function toSQL(orm) {
	  var schema = orm.schema;
	  var listFields = orm.listFields;
	  var paramters = orm.paramters;
	  var table = schema.table;
	  var fields = schema.fields;


	  return ('\nINSERT INTO ' + table + ' (' + listFields.join(', ') + ')\nVALUES (' + paramters.join(', ') + ')\nRETURNING ' + (0, _keys2.default)(fields).join(', ') + ';\n').trim();
	};

	var objValues = function objValues(orm, values) {
	  var schema = orm.schema;
	  var fields = schema.fields;

	  orm.listFields = (0, _keys2.default)(values).filter(function (field) {
	    return fields.hasOwnProperty(field) && values[field] !== undefined;
	  });
	  orm.values = orm.listFields.map(function (field) {
	    return values[field];
	  });
	  orm.paramters = orm.listFields.map(function (f, index) {
	    return '$' + (index + 1);
	  });
	  return orm;
	};

	exports.default = function (schema) {
	  var orm = { schema: schema, values: {} };

	  orm.toSQL = toSQL.bind(undefined, orm);
	  orm.objValues = objValues.bind(undefined, orm);

	  return orm;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _assign = __webpack_require__(6);

	var _assign2 = _interopRequireDefault(_assign);

	var _comparatorWhere = __webpack_require__(8);

	var _comparatorWhere2 = _interopRequireDefault(_comparatorWhere);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakline = '\n';

	var orderBy = function orderBy(orm, field, order) {
	  if (!order) order = '';
	  orm.order.push((field + ' ' + order.toUpperCase()).trim());
	  return orm;
	};

	var field = function field(orm, _field) {
	  orm.fields.push(_field);
	  return orm;
	};

	var groupBy = function groupBy(orm, field) {
	  orm.group.push(field);
	  return orm;
	};

	var join = function join(orm, joinString) {
	  orm.joins.push(joinString);
	  return orm;
	};

	var fromTable = function fromTable(orm, tableName) {
	  return (0, _assign2.default)(orm, { tableName: tableName });
	};
	var limit = function limit(orm, limitRows) {
	  return (0, _assign2.default)(orm, { limitRows: limitRows });
	};
	var skip = function skip(orm, skipRows) {
	  return (0, _assign2.default)(orm, { skipRows: skipRows });
	};

	var condToStr = function condToStr(conditions, values) {
	  var seq = arguments.length <= 2 || arguments[2] === undefined ? { c: 0 } : arguments[2];

	  return (0, _keys2.default)(conditions).map(function (field) {
	    var fieldVal = conditions[field];
	    if (field.toLowerCase() === '$or') return '(' + condToStr(fieldVal, values, seq).join(') OR (') + ')';
	    seq.c++;

	    var _comWhere = (0, _comparatorWhere2.default)(fieldVal);

	    var comparator = _comWhere.comparator;
	    var value = _comWhere.value;

	    values.push(value);
	    return field + ' ' + comparator + ' $' + seq.c;
	  });
	};

	var where = function where(orm, conditions) {
	  if (!conditions) conditions = {};
	  orm.conditions = condToStr(conditions, orm.values);
	  return orm;
	};

	var toSQL = function toSQL(_ref) {
	  var tableName = _ref.tableName;
	  var fields = _ref.fields;
	  var order = _ref.order;
	  var group = _ref.group;
	  var conditions = _ref.conditions;
	  var limitRows = _ref.limitRows;
	  var skipRows = _ref.skipRows;
	  var joins = _ref.joins;

	  var skip = skipRows ? breakline + 'OFFSET ' + skipRows : '';
	  var limit = limitRows ? breakline + 'LIMIT ' + limitRows : '';
	  var orderBy = order && order.length ? breakline + 'ORDER BY ' + order.join(', ') : '';
	  var groupBy = group && group.length ? breakline + 'GROUP BY ' + group.join(', ') : '';
	  var sqlWhere = conditions && conditions.length ? breakline + 'WHERE (' + conditions.join(')' + breakline + '  AND (') + ')' : '';
	  var allJoins = joins && joins.length ? '' + breakline + joins.join(breakline) : '';

	  return ('\nSELECT ' + fields.join(', ') + '\nFROM ' + tableName + allJoins + sqlWhere + groupBy + orderBy + limit + skip + '\n  ').trim();
	};

	exports.default = function () {
	  var orm = { tableName: '', fields: [], order: [], group: [], values: [], joins: [] };
	  orm.from = fromTable.bind(undefined, orm);
	  orm.join = join.bind(undefined, orm);
	  orm.skip = skip.bind(undefined, orm);
	  orm.limit = limit.bind(undefined, orm);
	  orm.field = field.bind(undefined, orm);
	  orm.toSQL = toSQL.bind(undefined, orm);
	  orm.where = where.bind(undefined, orm);
	  orm.orderBy = orderBy.bind(undefined, orm);
	  orm.groupBy = groupBy.bind(undefined, orm);
	  return orm;
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _comparatorWhere = __webpack_require__(8);

	var _comparatorWhere2 = _interopRequireDefault(_comparatorWhere);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var breakline = '\n';

	var toSQL = function toSQL(orm) {
	  var schema = orm.schema;
	  var paramters = orm.paramters;
	  var conditions = orm.conditions;
	  var table = schema.table;
	  var fields = schema.fields;

	  var sqlWhere = conditions && conditions.length ? breakline + 'WHERE (' + conditions.join(')' + breakline + '  AND (') + ')' : '';

	  return ('\nUPDATE ' + table + ' SET\n  ' + paramters.join(',' + breakline + '  ') + sqlWhere + '\nRETURNING ' + (0, _keys2.default)(fields).join(', ') + ';\n').trim();
	};

	var objValues = function objValues(orm, values, conditions) {
	  var schema = orm.schema;
	  var fields = schema.fields;

	  var listFields = (0, _keys2.default)(values).filter(function (field) {
	    return fields.hasOwnProperty(field) && values[field] !== undefined;
	  });
	  orm.values = listFields.map(function (field) {
	    return values[field];
	  });
	  orm.paramters = listFields.map(function (field, index) {
	    return field + ' = $' + (index + 1);
	  });
	  orm.conditions = (0, _keys2.default)(conditions || {}).map(function (field, index) {
	    var _comWhere = (0, _comparatorWhere2.default)(conditions[field]);

	    var comparator = _comWhere.comparator;
	    var value = _comWhere.value;

	    orm.values.push(value);
	    return field + ' ' + comparator + ' $' + (listFields.length + index + 1);
	  });

	  return orm;
	};

	exports.default = function (schema) {
	  var orm = { schema: schema, values: [], conditions: [] };

	  orm.toSQL = toSQL.bind(undefined, orm);
	  orm.objValues = objValues.bind(undefined, orm);

	  return orm;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(3);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _gen = __webpack_require__(4);

	var _objRow = __webpack_require__(9);

	var _objRow2 = _interopRequireDefault(_objRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(connection, schema, conditions) {
	    var deleteCommand, deleteValues, deleteSQL, _ref2, rows;

	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            deleteCommand = (0, _gen.deleteTable)(schema).objValues(conditions);
	            deleteValues = deleteCommand.values;
	            deleteSQL = deleteCommand.toSQL();
	            _context.next = 5;
	            return connection.execute(deleteSQL, deleteValues);

	          case 5:
	            _ref2 = _context.sent;
	            rows = _ref2.rows;

	            if (!(!rows || !rows.length)) {
	              _context.next = 9;
	              break;
	            }

	            return _context.abrupt('return', undefined);

	          case 9:
	            return _context.abrupt('return', rows.map(_objRow2.default.bind(undefined, schema)).shift());

	          case 10:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function (_x, _x2, _x3) {
	    return _ref.apply(this, arguments);
	  };
	}();

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toConsumableArray2 = __webpack_require__(27);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _regenerator = __webpack_require__(3);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _defineProperty2 = __webpack_require__(7);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _promise = __webpack_require__(11);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _select = __webpack_require__(10);

	var _select2 = _interopRequireDefault(_select);

	var _objRow = __webpack_require__(9);

	var _objRow2 = _interopRequireDefault(_objRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var populateHasMany = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(tables, connection, schema, row, refs) {
	    var hasMany;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            hasMany = schema.hasMany;
	            _context2.next = 3;
	            return _promise2.default.all((0, _keys2.default)(hasMany || {}).map(function () {
	              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(hasManyField) {
	                var _hasMany$hasManyField, table, field, schemaHasMany, select, _ref3, rows;

	                return _regenerator2.default.wrap(function _callee$(_context) {
	                  while (1) {
	                    switch (_context.prev = _context.next) {
	                      case 0:
	                        _hasMany$hasManyField = hasMany[hasManyField];
	                        table = _hasMany$hasManyField.table;
	                        field = _hasMany$hasManyField.field;
	                        schemaHasMany = tables[table];
	                        select = _select2.default.bind(undefined, connection, schemaHasMany);
	                        _context.next = 7;
	                        return select('id').where((0, _defineProperty3.default)({}, field, row.id)).run();

	                      case 7:
	                        _ref3 = _context.sent;
	                        rows = _ref3.rows;

	                        if (!(!rows || !rows.length)) {
	                          _context.next = 11;
	                          break;
	                        }

	                        return _context.abrupt('return');

	                      case 11:
	                        _context.next = 13;
	                        return _promise2.default.all(rows.map(function (_ref4) {
	                          var id = _ref4.id;
	                          return findById(tables, connection, schemaHasMany, id, refs);
	                        }));

	                      case 13:
	                        row[hasManyField] = _context.sent;

	                      case 14:
	                      case 'end':
	                        return _context.stop();
	                    }
	                  }
	                }, _callee, undefined);
	              }));

	              return function (_x6) {
	                return _ref2.apply(this, arguments);
	              };
	            }()));

	          case 3:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, undefined);
	  }));

	  return function populateHasMany(_x, _x2, _x3, _x4, _x5) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var populateManyToMany = function () {
	  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(tables, connection, schema, row, refs) {
	    var manyToMany;
	    return _regenerator2.default.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            manyToMany = schema.manyToMany;
	            _context5.next = 3;
	            return _promise2.default.all((0, _keys2.default)(manyToMany || {}).map(function () {
	              var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(manyToManyField) {
	                var _manyToMany$manyToMan, table, primary, secondary, extraFields, schema, schemaManyToMany, select, listExtraFields, _ref7, rows;

	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                  while (1) {
	                    switch (_context4.prev = _context4.next) {
	                      case 0:
	                        _manyToMany$manyToMan = manyToMany[manyToManyField];
	                        table = _manyToMany$manyToMan.table;
	                        primary = _manyToMany$manyToMan.primary;
	                        secondary = _manyToMany$manyToMan.secondary;
	                        extraFields = _manyToMany$manyToMan.extraFields;
	                        schema = _manyToMany$manyToMan.schema;
	                        schemaManyToMany = tables[table];
	                        select = _select2.default.bind(undefined, connection, schemaManyToMany);
	                        listExtraFields = (0, _keys2.default)(extraFields);
	                        _context4.next = 11;
	                        return select.apply(undefined, [secondary].concat((0, _toConsumableArray3.default)(listExtraFields))).where((0, _defineProperty3.default)({}, primary, row.id)).run();

	                      case 11:
	                        _ref7 = _context4.sent;
	                        rows = _ref7.rows;

	                        if (!(!rows || !rows.length)) {
	                          _context4.next = 15;
	                          break;
	                        }

	                        return _context4.abrupt('return');

	                      case 15:
	                        _context4.next = 17;
	                        return _promise2.default.all(rows.map(function () {
	                          var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(rel) {
	                            var id, row;
	                            return _regenerator2.default.wrap(function _callee3$(_context3) {
	                              while (1) {
	                                switch (_context3.prev = _context3.next) {
	                                  case 0:
	                                    id = rel[secondary];
	                                    _context3.next = 3;
	                                    return findById(tables, connection, tables[schema], id, refs);

	                                  case 3:
	                                    row = _context3.sent;

	                                    listExtraFields.forEach(function (field) {
	                                      return row[field] = rel[field];
	                                    });
	                                    return _context3.abrupt('return', row);

	                                  case 6:
	                                  case 'end':
	                                    return _context3.stop();
	                                }
	                              }
	                            }, _callee3, undefined);
	                          }));

	                          return function (_x13) {
	                            return _ref8.apply(this, arguments);
	                          };
	                        }()));

	                      case 17:
	                        row[manyToManyField] = _context4.sent;

	                      case 18:
	                      case 'end':
	                        return _context4.stop();
	                    }
	                  }
	                }, _callee4, undefined);
	              }));

	              return function (_x12) {
	                return _ref6.apply(this, arguments);
	              };
	            }()));

	          case 3:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, undefined);
	  }));

	  return function populateManyToMany(_x7, _x8, _x9, _x10, _x11) {
	    return _ref5.apply(this, arguments);
	  };
	}();

	var findById = function () {
	  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(tables, connection, schema, id) {
	    var refs = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];

	    var ref, select, _ref10, rows, row;

	    return _regenerator2.default.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            ref = schema.table + '-' + id;

	            if (!refs.hasOwnProperty(ref)) {
	              _context6.next = 3;
	              break;
	            }

	            return _context6.abrupt('return', refs[ref]);

	          case 3:
	            select = _select2.default.bind(undefined, connection, schema);
	            _context6.next = 6;
	            return select().where({ id: id }).limit(1).run();

	          case 6:
	            _ref10 = _context6.sent;
	            rows = _ref10.rows;

	            if (!(!rows || !rows.length)) {
	              _context6.next = 10;
	              break;
	            }

	            return _context6.abrupt('return', undefined);

	          case 10:
	            row = rows.map(_objRow2.default.bind(undefined, schema)).shift();

	            refs[ref] = row;
	            _context6.next = 14;
	            return populateHasMany(tables, connection, schema, row, refs);

	          case 14:
	            _context6.next = 16;
	            return populateManyToMany(tables, connection, schema, row, refs);

	          case 16:
	            return _context6.abrupt('return', row);

	          case 17:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, undefined);
	  }));

	  return function findById(_x14, _x15, _x16, _x17, _x18) {
	    return _ref9.apply(this, arguments);
	  };
	}();

	var findBy = function () {
	  var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(tables, connection, schema, attr, value) {
	    var select, _ref12, rows, refs, searchsById;

	    return _regenerator2.default.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            select = _select2.default.bind(undefined, connection, schema);
	            _context7.next = 3;
	            return select('id').where((0, _defineProperty3.default)({}, attr, value)).run();

	          case 3:
	            _ref12 = _context7.sent;
	            rows = _ref12.rows;

	            if (!(!rows || !rows.length)) {
	              _context7.next = 7;
	              break;
	            }

	            return _context7.abrupt('return', []);

	          case 7:
	            refs = {};
	            searchsById = rows.map(function (_ref13) {
	              var id = _ref13.id;
	              return findById(tables, connection, schema, id, refs);
	            });
	            return _context7.abrupt('return', _promise2.default.all(searchsById));

	          case 10:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, undefined);
	  }));

	  return function findBy(_x20, _x21, _x22, _x23, _x24) {
	    return _ref11.apply(this, arguments);
	  };
	}();

	var findByAttr = function findByAttr(tables, connection, schema) {
	  var findObj = {};

	  (0, _keys2.default)(schema.fields).forEach(function (field) {
	    var findAttr = 'findBy' + field.charAt(0).toUpperCase().concat(field.slice(1));
	    if (field === 'id') return findObj[findAttr] = findById.bind(undefined, tables, connection, schema);
	    findObj[findAttr] = findBy.bind(undefined, tables, connection, schema, field);
	  });

	  return findObj;
	};

	exports.default = findByAttr;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(7);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _assign = __webpack_require__(6);

	var _assign2 = _interopRequireDefault(_assign);

	var _stringify = __webpack_require__(25);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _select = __webpack_require__(10);

	var _select2 = _interopRequireDefault(_select);

	var _delete = __webpack_require__(21);

	var _delete2 = _interopRequireDefault(_delete);

	var _findByAttr = __webpack_require__(22);

	var _findByAttr2 = _interopRequireDefault(_findByAttr);

	var _insUpd = __webpack_require__(24);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ormModel = function ormModel(tables, connection, modelName) {
	  var schema = JSON.parse((0, _stringify2.default)(tables[modelName]));

	  if (tables[modelName].hasOwnProperty('afterSave')) schema.afterSave = tables[modelName].afterSave;
	  if (tables[modelName].hasOwnProperty('beforeSave')) schema.beforeSave = tables[modelName].beforeSave;

	  var orm = ormModel.bind(undefined, tables, connection);

	  var model = { schema: schema };
	  model.select = _select2.default.bind(undefined, connection, schema);
	  model.delete = _delete2.default.bind(undefined, connection, schema);
	  model.insert = _insUpd.insertData.bind(undefined, orm, tables, connection, schema);
	  model.update = _insUpd.updateData.bind(undefined, orm, tables, connection, schema);
	  return (0, _assign2.default)(model, (0, _findByAttr2.default)(tables, connection, schema));
	};

	var ormDatabase = function ormDatabase(tables, connection) {
	  return ormModel.bind(undefined, tables, connection);
	};

	exports.default = function (schemas) {
	  var tables = {};
	  schemas.forEach(function (schema) {
	    return (0, _assign2.default)(tables, (0, _defineProperty3.default)({}, schema.table, schema));
	  });
	  return ormDatabase.bind(undefined, tables);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateData = exports.insertData = undefined;

	var _regenerator = __webpack_require__(3);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _defineProperty2 = __webpack_require__(7);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _assign = __webpack_require__(6);

	var _assign2 = _interopRequireDefault(_assign);

	var _extends3 = __webpack_require__(26);

	var _extends4 = _interopRequireDefault(_extends3);

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _promise = __webpack_require__(11);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(2);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _gen = __webpack_require__(4);

	var _select = __webpack_require__(10);

	var _select2 = _interopRequireDefault(_select);

	var _objRow = __webpack_require__(9);

	var _objRow2 = _interopRequireDefault(_objRow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var saveManyToMany = function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(orm, tables, connection, _ref2, rowSaved, data) {
	    var manyToMany = _ref2.manyToMany;
	    var id;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            id = rowSaved.id;
	            return _context3.abrupt('return', _promise2.default.all((0, _keys2.default)(manyToMany || {}).map(function () {
	              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(manyToManyField) {
	                var manyToManyRows, _manyToMany$manyToMan, table, primary, secondary, schema, extraFields, manyToManySchema;

	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                  while (1) {
	                    switch (_context2.prev = _context2.next) {
	                      case 0:
	                        manyToManyRows = data[manyToManyField];

	                        if (!(!manyToManyRows || !manyToManyRows.length)) {
	                          _context2.next = 3;
	                          break;
	                        }

	                        return _context2.abrupt('return');

	                      case 3:
	                        _manyToMany$manyToMan = manyToMany[manyToManyField];
	                        table = _manyToMany$manyToMan.table;
	                        primary = _manyToMany$manyToMan.primary;
	                        secondary = _manyToMany$manyToMan.secondary;
	                        schema = _manyToMany$manyToMan.schema;
	                        extraFields = _manyToMany$manyToMan.extraFields;
	                        manyToManySchema = tables[schema];
	                        _context2.next = 12;
	                        return _promise2.default.all(manyToManyRows.map(function (manyToManyRow, index) {
	                          var manyToManyData = (0, _extends4.default)({}, manyToManyRow);
	                          (0, _keys2.default)(extraFields).forEach(function (field) {
	                            return delete manyToManyData[field];
	                          });
	                          var manyToManyId = manyToManyData.id;
	                          return manyToManyId ? updateData(orm, tables, connection, manyToManySchema, manyToManyData, { id: manyToManyId }) : insertData(orm, tables, connection, manyToManySchema, manyToManyData);
	                        }));

	                      case 12:
	                        rowSaved[manyToManyField] = _context2.sent;
	                        _context2.next = 15;
	                        return _promise2.default.all(manyToManyRows.map(function () {
	                          var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(manyToManyRow, index) {
	                            var _select$from$where;

	                            var tableData, secondaryId, select, _ref5, rows, dataId, manyToManySaved;

	                            return _regenerator2.default.wrap(function _callee$(_context) {
	                              while (1) {
	                                switch (_context.prev = _context.next) {
	                                  case 0:
	                                    tableData = {};

	                                    (0, _keys2.default)(extraFields).forEach(function (field) {
	                                      return tableData[field] = manyToManyRow[field];
	                                    });
	                                    secondaryId = rowSaved[manyToManyField][index].id;

	                                    tableData[primary] = id;
	                                    tableData[secondary] = secondaryId;
	                                    select = _select2.default.bind(undefined, connection, tables[table]);
	                                    _context.next = 8;
	                                    return select('id').from('kinships').where((_select$from$where = {}, (0, _defineProperty3.default)(_select$from$where, primary, id), (0, _defineProperty3.default)(_select$from$where, secondary, secondaryId), _select$from$where)).limit(1).run();

	                                  case 8:
	                                    _ref5 = _context.sent;
	                                    rows = _ref5.rows;
	                                    dataId = rows && rows.length ? rows.shift().id : undefined;

	                                    if (!dataId) {
	                                      _context.next = 17;
	                                      break;
	                                    }

	                                    _context.next = 14;
	                                    return updateData(orm, tables, connection, tables[table], tableData, { id: dataId });

	                                  case 14:
	                                    _context.t0 = _context.sent;
	                                    _context.next = 20;
	                                    break;

	                                  case 17:
	                                    _context.next = 19;
	                                    return insertData(orm, tables, connection, tables[table], tableData);

	                                  case 19:
	                                    _context.t0 = _context.sent;

	                                  case 20:
	                                    manyToManySaved = _context.t0;

	                                    (0, _keys2.default)(extraFields).forEach(function (field) {
	                                      return (0, _assign2.default)(rowSaved[manyToManyField][index], (0, _defineProperty3.default)({}, field, manyToManySaved[field]));
	                                    });

	                                  case 22:
	                                  case 'end':
	                                    return _context.stop();
	                                }
	                              }
	                            }, _callee, undefined);
	                          }));

	                          return function (_x8, _x9) {
	                            return _ref4.apply(this, arguments);
	                          };
	                        }()));

	                      case 15:
	                      case 'end':
	                        return _context2.stop();
	                    }
	                  }
	                }, _callee2, undefined);
	              }));

	              return function (_x7) {
	                return _ref3.apply(this, arguments);
	              };
	            }())));

	          case 2:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, undefined);
	  }));

	  return function saveManyToMany(_x, _x2, _x3, _x4, _x5, _x6) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var saveHasMany = function () {
	  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(orm, tables, connection, _ref7, rowSaved, data) {
	    var hasMany = _ref7.hasMany;
	    var id;
	    return _regenerator2.default.wrap(function _callee5$(_context5) {
	      while (1) {
	        switch (_context5.prev = _context5.next) {
	          case 0:
	            id = rowSaved.id;
	            _context5.next = 3;
	            return _promise2.default.all((0, _keys2.default)(hasMany || {}).map(function () {
	              var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(hasManyField) {
	                var hasManyRows, _hasMany$hasManyField, table, field, hasManySchema;

	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                  while (1) {
	                    switch (_context4.prev = _context4.next) {
	                      case 0:
	                        hasManyRows = data[hasManyField];

	                        if (!(!hasManyRows || !hasManyRows.length)) {
	                          _context4.next = 3;
	                          break;
	                        }

	                        return _context4.abrupt('return');

	                      case 3:
	                        _hasMany$hasManyField = hasMany[hasManyField];
	                        table = _hasMany$hasManyField.table;
	                        field = _hasMany$hasManyField.field;
	                        hasManySchema = tables[table];
	                        _context4.next = 9;
	                        return _promise2.default.all(hasManyRows.map(function (hasManyRow, index) {
	                          var hasManyData = (0, _extends4.default)({}, hasManyRow, (0, _defineProperty3.default)({}, field, id));
	                          var hasManyId = hasManyData.id;
	                          return hasManyId ? updateData(orm, tables, connection, hasManySchema, hasManyData, { id: hasManyId }) : insertData(orm, tables, connection, hasManySchema, hasManyData);
	                        }));

	                      case 9:
	                        rowSaved[hasManyField] = _context4.sent;

	                      case 10:
	                      case 'end':
	                        return _context4.stop();
	                    }
	                  }
	                }, _callee4, undefined);
	              }));

	              return function (_x16) {
	                return _ref8.apply(this, arguments);
	              };
	            }()));

	          case 3:
	          case 'end':
	            return _context5.stop();
	        }
	      }
	    }, _callee5, undefined);
	  }));

	  return function saveHasMany(_x10, _x11, _x12, _x13, _x14, _x15) {
	    return _ref6.apply(this, arguments);
	  };
	}();

	var saveRelations = function () {
	  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(orm, tables, connection, schema, rowSaved, data) {
	    return _regenerator2.default.wrap(function _callee6$(_context6) {
	      while (1) {
	        switch (_context6.prev = _context6.next) {
	          case 0:
	            _context6.next = 2;
	            return saveHasMany(orm, tables, connection, schema, rowSaved, data);

	          case 2:
	            _context6.next = 4;
	            return saveManyToMany(orm, tables, connection, schema, rowSaved, data);

	          case 4:
	            return _context6.abrupt('return', rowSaved);

	          case 5:
	          case 'end':
	            return _context6.stop();
	        }
	      }
	    }, _callee6, undefined);
	  }));

	  return function saveRelations(_x17, _x18, _x19, _x20, _x21, _x22) {
	    return _ref9.apply(this, arguments);
	  };
	}();

	var insertData = exports.insertData = function () {
	  var _ref10 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(orm, tables, connection, schema, data) {
	    var beforeSave, insertCommand, insertValues, insertSQL, _ref11, rows, rowSaved, afterSaved, dataInserted;

	    return _regenerator2.default.wrap(function _callee7$(_context7) {
	      while (1) {
	        switch (_context7.prev = _context7.next) {
	          case 0:
	            beforeSave = void 0;

	            if (!schema.hasOwnProperty('beforeSave')) {
	              _context7.next = 5;
	              break;
	            }

	            _context7.next = 4;
	            return schema.beforeSave(data, orm(schema.table), orm);

	          case 4:
	            beforeSave = _context7.sent;

	          case 5:
	            if (beforeSave && (0, _keys2.default)(beforeSave).length) data = beforeSave;

	            insertCommand = (0, _gen.insertTable)(schema).objValues(data);
	            insertValues = insertCommand.values;
	            insertSQL = insertCommand.toSQL();
	            _context7.next = 11;
	            return connection.execute(insertSQL, insertValues);

	          case 11:
	            _ref11 = _context7.sent;
	            rows = _ref11.rows;

	            if (!(!rows || !rows.length)) {
	              _context7.next = 15;
	              break;
	            }

	            return _context7.abrupt('return', undefined);

	          case 15:
	            rowSaved = rows.map(_objRow2.default.bind(undefined, schema)).shift();
	            afterSaved = void 0;

	            if (!schema.hasOwnProperty('afterSave')) {
	              _context7.next = 21;
	              break;
	            }

	            _context7.next = 20;
	            return schema.afterSave(rowSaved, orm(schema.table), orm);

	          case 20:
	            afterSaved = _context7.sent;

	          case 21:
	            if (afterSaved && afterSaved.id) rowSaved = afterSaved;

	            _context7.next = 24;
	            return saveRelations(orm, tables, connection, schema, rowSaved, data);

	          case 24:
	            dataInserted = _context7.sent;

	            if (schema.ignoreFields) schema.ignoreFields.forEach(function (field) {
	              return delete dataInserted[field];
	            });

	            return _context7.abrupt('return', dataInserted);

	          case 27:
	          case 'end':
	            return _context7.stop();
	        }
	      }
	    }, _callee7, undefined);
	  }));

	  return function insertData(_x23, _x24, _x25, _x26, _x27) {
	    return _ref10.apply(this, arguments);
	  };
	}();

	var updateData = exports.updateData = function () {
	  var _ref12 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(orm, tables, connection, schema, data, conditions) {
	    var beforeSave, updateCommand, updateValues, updateSQL, _ref13, rows, rowSaved, afterSaved, dataUpdated;

	    return _regenerator2.default.wrap(function _callee8$(_context8) {
	      while (1) {
	        switch (_context8.prev = _context8.next) {
	          case 0:
	            beforeSave = void 0;

	            if (!schema.hasOwnProperty('beforeSave')) {
	              _context8.next = 5;
	              break;
	            }

	            _context8.next = 4;
	            return schema.beforeSave(data, orm(schema.table), orm);

	          case 4:
	            beforeSave = _context8.sent;

	          case 5:
	            if (beforeSave && (0, _keys2.default)(beforeSave).length) data = beforeSave;

	            updateCommand = (0, _gen.updateTable)(schema).objValues(data, conditions);
	            updateValues = updateCommand.values;
	            updateSQL = updateCommand.toSQL();
	            _context8.next = 11;
	            return connection.execute(updateSQL, updateValues);

	          case 11:
	            _ref13 = _context8.sent;
	            rows = _ref13.rows;

	            if (!(!rows || !rows.length)) {
	              _context8.next = 15;
	              break;
	            }

	            return _context8.abrupt('return', undefined);

	          case 15:
	            rowSaved = rows.map(_objRow2.default.bind(undefined, schema)).shift();
	            afterSaved = void 0;

	            if (!schema.hasOwnProperty('afterSave')) {
	              _context8.next = 21;
	              break;
	            }

	            _context8.next = 20;
	            return schema.afterSave(rowSaved, orm(schema.table), orm);

	          case 20:
	            afterSaved = _context8.sent;

	          case 21:
	            if (afterSaved && afterSaved.id) rowSaved = afterSaved;
	            _context8.next = 24;
	            return saveRelations(orm, tables, connection, schema, rowSaved, data);

	          case 24:
	            dataUpdated = _context8.sent;

	            if (schema.ignoreFields) schema.ignoreFields.forEach(function (field) {
	              return delete dataUpdated[field];
	            });
	            return _context8.abrupt('return', dataUpdated);

	          case 27:
	          case 'end':
	            return _context8.stop();
	        }
	      }
	    }, _callee8, undefined);
	  }));

	  return function updateData(_x28, _x29, _x30, _x31, _x32, _x33) {
	    return _ref12.apply(this, arguments);
	  };
		}();

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("pg");

/***/ }
/******/ ]);
//# sourceMappingURL=q-postgres.js.map