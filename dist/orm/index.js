'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _create=require('./man/create'),_create2=_interopRequireDefault(_create),_findById=require('./man/findById'),_findById2=_interopRequireDefault(_findById),_updateById=require('./man/updateById'),_updateById2=_interopRequireDefault(_updateById),_deleteById=require('./man/deleteById'),_deleteById2=_interopRequireDefault(_deleteById),_findByQuery2=require('./man/findByQuery'),_findByQuery3=_interopRequireDefault(_findByQuery2),_countByQuery2=require('./man/countByQuery'),_countByQuery3=_interopRequireDefault(_countByQuery2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(a){return function(b){var c={joins:[],create:_create2.default.bind(void 0,a,b),findById:_findById2.default.bind(void 0,a,b),deleteById:_deleteById2.default.bind(void 0,a,b),updateById:_updateById2.default.bind(void 0,a,b),findByQuery:function findByQuery(d){return(0,_findByQuery3.default)(Object.assign({},a,{joins:c.joins}),b,d)},countByQuery:function countByQuery(d){return(0,_countByQuery3.default)(Object.assign({},a,{joins:c.joins}),b,d)},join:function join(d){return c.joins.push(d),c}};return c}};