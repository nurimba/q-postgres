module.exports=function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.genSQL=t.types=void 0;var u=n(28),a=r(u),i=n(24),o=r(i),d=n(14),f=r(d),l=n(5),s=r(l),c=n(4),p=r(c);t.types=s.default,t.genSQL=p.default;t.default=function(e){var t=new a.default.Pool(e),n=f.default.bind(void 0,t,e);return{connect:n,orm:o.default,pool:t}}},function(e,t){e.exports=require("babel-runtime/core-js/object/keys")},function(e,t){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,t){e.exports=require("babel-runtime/regenerator")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.selectTable=t.deleteTable=t.updateTable=t.insertTable=t.createTable=t.alterTable=t.dropTable=void 0;var u=n(18),a=r(u),i=n(15),o=r(i),d=n(16),f=r(d),l=n(19),s=r(l),c=n(21),p=r(c),v=n(17),b=r(v),E=n(20),h=r(E),m=t.dropTable=a.default,T=t.alterTable=o.default,x=t.createTable=f.default,N=t.insertTable=s.default,R=t.updateTable=p.default,O=t.deleteTable=b.default,w=t.selectTable=h.default;t.default={dropTable:m,alterTable:T,createTable:x,insertTable:N,updateTable:R,deleteTable:O,selectTable:w}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.TEXT="TEXT",r=t.CITEXT="CITEXT",u=t.NAME="VARCHAR(255)",a=t.DATE="DATE",i=t.JSON="JSON",o=t.CHAR1="CHAR(1)",d=t.CHAR2="CHAR(2)",f=t.CHAR8="CHAR(8)",l=t.EMAIL="VARCHAR(50)",s=t.PHONE="VARCHAR(30)",c=t.MONEY="NUMERIC(15,2)",p=t.STRING="VARCHAR(255)",v=t.SELECT="VARCHAR(25)",b=t.BOOLEAN="BOOLEAN",E=t.INTEGER="INTEGER",h=t.SMALLINT="SMALLINT",m=t.CPFCNPJ="VARCHAR(14)",T=t.PERCENT="NUMERIC(15,8)",x=t.PRIMARY="SERIAL PRIMARY KEY",N=t.DATETIME="TIMESTAMP",R=t.REFERENCES="REFERENCES",O=t.NOT_NULL="NOT NULL";t.default={TEXT:n,DATE:a,JSON:i,NAME:u,CHAR1:o,CHAR2:d,CHAR8:f,EMAIL:l,PHONE:s,MONEY:c,STRING:p,SELECT:v,CITEXT:r,BOOLEAN:b,INTEGER:E,CPFCNPJ:m,PERCENT:T,PRIMARY:x,DATETIME:N,SMALLINT:h,NOT_NULL:O,REFERENCES:R}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={eq:"=",lt:"<",gt:">",lq:"<=",gq:">=",df:"<>",lk:"like","==":"=","<<":"<",">>":">","<=":"<=",">=":">=","<>":"<>","%%":"like"};t.default=function(e){var t=n.eq;if("string"!=typeof e)return{comparator:t,value:e};var r=e.split(":"),u=r.shift();if(!n.hasOwnProperty(u))return{comparator:t,value:e};t=n[u];var a=r.join(":").trim();return{comparator:t,value:"like"===t?"%"+a+"%":a}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.formatInteger=t.formatFloat=t.formatDate=void 0;var u=n(1),a=r(u),i=n(5),o=t.formatDate=function(e){if(!e||!String(e).trim())return null;var t=new Date(e),n=("0"+t.getDate()).substr(-2),r=("0"+(t.getMonth()+1)).substr(-2);return t.getFullYear()+"-"+r+"-"+n},d=t.formatFloat=function(e){return e&&String(e).trim()?parseFloat(e):null},f=t.formatInteger=function(e){return e&&String(e).trim()?parseInt(e,10):null};t.default=function(e,t){return(0,a.default)(e.fields).forEach(function(n){var r=String(n||"").toLowerCase(),u=Boolean(n!==r),a=u?r:n;if(t.hasOwnProperty(a)){var l=t[a];e.fields[n]===i.DATE&&(l=o(l)),[i.MONEY,i.PERCENT].indexOf(e.fields[n])>-1&&(l=d(l)),[i.INTEGER,i.REFERENCES].indexOf(e.fields[n])>-1&&(l=f(l)),t[n]=l,u&&delete t[a]}}),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(3),a=r(u),i=n(2),o=r(i),d=n(1),f=r(d),l=n(4),s=n(7),c=r(s);t.default=function(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),u=2;u<n;u++)r[u-2]=arguments[u];r&&r.length||(r=(0,f.default)(t.fields));var i=(0,l.selectTable)();return i.from(t.table),r.forEach(function(e){return i.field(e)}),i.run=(0,o.default)(a.default.mark(function n(){var r,u,o;return a.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=i.values,u=i.toSQL(),n.next=4,e.execute(u,r);case 4:return o=n.sent,o.rows&&o.rows.length&&(o.rows=o.rows.map(c.default.bind(void 0,t))),n.abrupt("return",o);case 7:case"end":return n.stop()}},n,void 0)})),i}},function(e,t){e.exports=require("babel-runtime/core-js/object/assign")},function(e,t){e.exports=require("babel-runtime/core-js/promise")},function(e,t){e.exports=require("babel-runtime/helpers/defineProperty")},function(e,t){e.exports=require("babel-runtime/helpers/typeof")},function(e,t){e.exports=require("babel-runtime/helpers/extends")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(10),a=r(u),i=n(3),o=r(i),d=n(2),f=r(d),l="BEGIN",s="COMMIT",c="ROLLBACK",p=function(){var e=(0,f.default)(o.default.mark(function e(t){var n,r;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.connect();case 2:if(n=e.sent,r=n.errno,!r){e.next=6;break}throw new Error(n.message);case 6:return e.abrupt("return",n);case 7:case"end":return e.stop()}},e,void 0)}));return function(t){return e.apply(this,arguments)}}(),v=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];return new a.default(function(r,u){e.query(t,n,function(a,i){return e.config.debug&&console.log("\n--------------------------\nSQL => "+t+"\n\nPARAMS => "+n.join(", ")+"\n\nERROR => "+a+"\n\nRESULT => "+i+"\n--------------------------\n        "),a?u(a):void r(i)})})};t.default=function(){var e=(0,f.default)(o.default.mark(function e(t,n){var r,u;return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p(t);case 2:return r=e.sent,r.config=n,u={release:function(){var e=(0,f.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",r.release());case 1:case"end":return e.stop()}},e,void 0)}));return function(){return e.apply(this,arguments)}}(),execute:v.bind(void 0,r),commit:function(){var e=(0,f.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(r,s);case 2:return e.abrupt("return",u);case 3:case"end":return e.stop()}},e,void 0)}));return function(){return e.apply(this,arguments)}}(),rollback:function(){var e=(0,f.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(r,c);case 2:return e.abrupt("return",u);case 3:case"end":return e.stop()}},e,void 0)}));return function(){return e.apply(this,arguments)}}(),startTransaction:function(){var e=(0,f.default)(o.default.mark(function e(){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(r,l);case 2:return e.abrupt("return",u);case 3:case"end":return e.stop()}},e,void 0)}));return function(){return e.apply(this,arguments)}}()},e.abrupt("return",u);case 6:case"end":return e.stop()}},e,void 0)}));return function(t,n){return e.apply(this,arguments)}}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),a=r(u),i=n(5),o="\n",d=function(e,t,n,r,u,o){var d=t.adds,f="",l="";return u&&(f=" NOT NULL"),void 0!==o&&(l=["boolean","number",""].indexOf("undefined"==typeof o?"undefined":(0,a.default)(o))>-1?" DEFAULT "+String(o).toUpperCase():" DEFAULT '"+o+"'"),d.push("ADD COLUMN "+n+" "+(r===i.REFERENCES?i.INTEGER:r)+f+l),e},f=function(e,t,n){var r=t.drops;return r.push("DROP COLUMN "+n+" RESTRICT"),e},l=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" DROP DEFAULT"),e},s=function(e,t,n,r){var u=t.alters,i="";return void 0!==r&&(i=["boolean","number",""].indexOf("undefined"==typeof r?"undefined":(0,a.default)(r))>-1?""+String(r).toUpperCase():"'"+r+"'"),u.push("ALTER COLUMN "+n+" SET DEFAULT "+i),e},c=function(e){var t=e.tableName,n=e.adds,r=e.alters,u=e.drops,a=e.indexs;return("\nALTER TABLE "+t+"\n  "+n.concat(r,u,a).join(","+o+"  ")+";\n").trim()},p=function(e,t,n,r){var u=t.alters;return u.push("ALTER COLUMN "+n+" TYPE "+(r===i.REFERENCES?i.INTEGER:r)),e},v=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" DROP NOT NULL"),e},b=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" SET NOT NULL"),e},E=function(e,t,n,r){var u=t.alters;return u.push("RENAME COLUMN "+n+" TO "+r),e},h=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("ADD CONSTRAINT unique_"+r+"_"+n+" UNIQUE ("+n+")"),e},m=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("DROP CONSTRAINT unique_"+r+"_"+n),e},T=function(e,t,n,r,u){var a=t.tableName,i=t.indexs;return i.push("ADD CONSTRAINT foreign_"+a+"_"+n+" FOREIGN KEY ("+n+") REFERENCES "+r+" ("+(u?u:"id")+")"),e},x=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("DROP CONSTRAINT foreign_"+r+"_"+n),e};t.default=function(e){var t={tableName:e,adds:[],drops:[],alters:[],indexs:[]},n={};return n.toSQL=c.bind(void 0,t),n.setType=p.bind(void 0,n,t),n.addColumn=d.bind(void 0,n,t),n.addUnique=h.bind(void 0,n,t),n.dropUnique=m.bind(void 0,n,t),n.dropColumn=f.bind(void 0,n,t),n.setDefault=s.bind(void 0,n,t),n.setNotNull=b.bind(void 0,n,t),n.dropNotNull=v.bind(void 0,n,t),n.dropDefault=l.bind(void 0,n,t),n.renameColumn=E.bind(void 0,n,t),n.addForeign=T.bind(void 0,n,t),n.dropForeign=x.bind(void 0,n,t),n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),a=r(u),i=n(5),o="\n",d=function(e,t,n,r,u,o){var d=t.columns,f="",l="";return u&&(f=" NOT NULL"),void 0!==o&&(l=["boolean","number",""].indexOf("undefined"==typeof o?"undefined":(0,a.default)(o))>-1?" DEFAULT "+String(o).toUpperCase():" DEFAULT '"+o+"'"),d.push(n+" "+(r===i.REFERENCES?i.INTEGER:r)+f+l),e},f=function(e,t,n){var r=t.tableName,u=t.uniques;return u.push("CONSTRAINT unique_"+r+"_"+n+" UNIQUE ("+n+")"),e},l=function(e,t,n,r,u){var a=t.tableName,i=t.foreigns;return i.push("CONSTRAINT foreign_"+a+"_"+n+" FOREIGN KEY ("+n+") REFERENCES "+r+" ("+(u?u:"id")+")"),e},s=function(e){var t=e.tableName,n=e.columns,r=e.uniques,u=e.foreigns;return("\nCREATE TABLE "+t+" (\n  "+n.concat(r,u).join(","+o+"  ")+"\n);\n").trim()};t.default=function(e){var t={tableName:e,columns:[],uniques:[],foreigns:[]},n={};return n.toSQL=s.bind(void 0,t),n.unique=f.bind(void 0,n,t),n.column=d.bind(void 0,n,t),n.foreign=l.bind(void 0,n,t),n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=n(6),o=r(i),d="\n",f=function(e){var t=e.schema,n=e.conditions,r=t.table,u=t.fields,i=n&&n.length?d+"WHERE ("+n.join(")"+d+"  AND (")+")":"";return("\nDELETE FROM "+r+i+"\nRETURNING "+(0,a.default)(u).join(", ")+";\n").trim()},l=function(e,t){return e.values=[],e.conditions=(0,a.default)(t||{}).map(function(n,r){var u=(0,o.default)(t[n]),a=u.comparator,i=u.value;return e.values.push(i),n+" "+a+" $"+(r+1)}),e};t.default=function(e){var t={schema:e,values:[],conditions:[]};return t.toSQL=f.bind(void 0,t),t.objValues=l.bind(void 0,t),t}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return("\nDROP TABLE "+e+";\n").trim()};t.default=function(e){var t={};return t.toSQL=n.bind(void 0,e),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=function(e){var t=e.schema,n=e.listFields,r=e.paramters,u=t.table,i=t.fields;return("\nINSERT INTO "+u+" ("+n.join(", ")+")\nVALUES ("+r.join(", ")+")\nRETURNING "+(0,a.default)(i).join(", ")+";\n").trim()},o=function(e,t){var n=e.schema,r=n.fields;return e.listFields=(0,a.default)(t).filter(function(e){return r.hasOwnProperty(e)&&void 0!==t[e]}),e.values=e.listFields.map(function(e){return t[e]}),e.paramters=e.listFields.map(function(e,t){return"$"+(t+1)}),e};t.default=function(e){var t={schema:e,values:{}};return t.toSQL=i.bind(void 0,t),t.objValues=o.bind(void 0,t),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),a=r(u),i=n(1),o=r(i),d=n(9),f=r(d),l=n(6),s=r(l),c="\n",p=function(e,t,n){return n||(n=""),e.order.push((t+" "+n.toUpperCase()).trim()),e},v=function(e,t){return e.fields.push(t),e},b=function(e,t){return e.group.push(t),e},E=function(e,t){return e.joins.push(t),e},h=function(e,t){return(0,f.default)(e,{tableName:t})},m=function(e,t){return(0,f.default)(e,{limitRows:t})},T=function(e,t){return(0,f.default)(e,{skipRows:t})},x=function e(t,n){return(0,o.default)(t).map(function(r){var u=t[r];if("$or"===r.toLowerCase())return"("+e(u,n).join(") OR (")+")";if("$and"===r.toLowerCase())return"("+e(u,n).join(") AND (")+")";if(Array.isArray(u)){var i=[];return u.forEach(function(t){return"object"===("undefined"==typeof t?"undefined":(0,a.default)(t))?i=i.concat(e(t,n)):void i.push(N(r,t,n))}),"("+i.join(") OR (")+")"}return N(r,u,n)})},N=function(e,t,n){var r=(0,s.default)(t),u=r.comparator,a=r.value;return null===a&&"="===u?e+" is null":(n.push(a),e+" "+u+" $"+n.length)},R=function(e,t){return t||(t={}),e.conditions||(e.conditions=[]),e.conditions=e.conditions.concat(x(t,e.values)),e},O=function(e){var t=e.tableName,n=e.fields,r=e.order,u=e.group,a=e.conditions,i=e.limitRows,o=e.skipRows,d=e.joins,f=o?c+"OFFSET "+o:"",l=i?c+"LIMIT "+i:"",s=r&&r.length?c+"ORDER BY "+r.join(", "):"",p=u&&u.length?c+"GROUP BY "+u.join(", "):"",v=a&&a.length?c+"WHERE ("+a.join(")"+c+"  AND (")+")":"",b=d&&d.length?""+c+d.join(c):"";return("\nSELECT "+n.join(", ")+"\nFROM "+t+b+v+p+s+l+f+"\n  ").trim()};t.default=function(){var e={tableName:"",fields:[],order:[],group:[],values:[],joins:[]};return e.from=h.bind(void 0,e),e.join=E.bind(void 0,e),e.skip=T.bind(void 0,e),e.limit=m.bind(void 0,e),e.field=v.bind(void 0,e),e.toSQL=O.bind(void 0,e),e.where=R.bind(void 0,e),e.orderBy=p.bind(void 0,e),e.groupBy=b.bind(void 0,e),e}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=n(6),o=r(i),d="\n",f=function(e){var t=e.schema,n=e.paramters,r=e.conditions,u=t.table,i=t.fields,o=r&&r.length?d+"WHERE ("+r.join(")"+d+"  AND (")+")":"";return("\nUPDATE "+u+" SET\n  "+n.join(","+d+"  ")+o+"\nRETURNING "+(0,a.default)(i).join(", ")+";\n").trim()},l=function(e,t,n){var r=e.schema,u=r.fields,i=(0,a.default)(t).filter(function(e){return u.hasOwnProperty(e)&&void 0!==t[e]});return e.values=i.map(function(e){return t[e]}),e.paramters=i.map(function(e,t){return e+" = $"+(t+1)}),e.conditions=(0,a.default)(n||{}).map(function(t,r){var u=(0,o.default)(n[t]),a=u.comparator,d=u.value;return e.values.push(d),t+" "+a+" $"+(i.length+r+1)}),e};t.default=function(e){var t={schema:e,values:[],conditions:[]};return t.toSQL=f.bind(void 0,t),t.objValues=l.bind(void 0,t),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(3),a=r(u),i=n(2),o=r(i),d=n(4),f=n(7),l=r(f);t.default=function(){var e=(0,o.default)(a.default.mark(function e(t,n,r){var u,i,o,f,s;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return u=(0,d.deleteTable)(n).objValues(r),i=u.values,o=u.toSQL(),e.next=5,t.execute(o,i);case 5:if(f=e.sent,s=f.rows,s&&s.length){e.next=9;break}return e.abrupt("return",void 0);case 9:return e.abrupt("return",s.map(l.default.bind(void 0,n)).shift());case 10:case"end":return e.stop()}},e,void 0)}));return function(t,n,r){return e.apply(this,arguments)}}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(13),a=r(u),i=n(27),o=r(i),d=n(3),f=r(d),l=n(11),s=r(l),c=n(2),p=r(c),v=n(1),b=r(v),E=n(10),h=r(E),m=n(8),T=r(m),x=function(e,t,n,r,u){var a=n.hasMany;return h.default.all((0,b.default)(a||{}).map(function(){var n=(0,p.default)(f.default.mark(function n(i){var o,d,l,c,p,v,b,E;return f.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return o=a[i],d=o.table,l=o.field,c=e[d],p=T.default.bind(void 0,t,c),v=(0,s.default)({},l,r.id),c.deleteField&&(v[c.deleteField]=!1),n.next=7,p("id").where(v).run();case 7:if(b=n.sent,E=b.rows,E&&E.length){n.next=11;break}return n.abrupt("return");case 11:return n.next=13,h.default.all(E.map(function(n){var r=n.id;return R(e,t,c,r,u)}));case 13:r[i]=n.sent;case 14:case"end":return n.stop()}},n,void 0)}));return function(e){return n.apply(this,arguments)}}()))},N=function(e,t,n,r,u){var a=n.manyToMany;return h.default.all((0,b.default)(a||{}).map(function(){var n=(0,p.default)(f.default.mark(function n(i){var d,l,c,v,E,m,x,N,O,w,y,A;return f.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return d=a[i],l=d.table,c=d.primary,v=d.secondary,E=d.extraFields,m=d.schema,x=e[l],N=T.default.bind(void 0,t,x),O=(0,b.default)(E),w=(0,s.default)({},c,r.id),x.deleteField&&(w[x.deleteField]=!1),n.next=8,N.apply(void 0,[v].concat((0,o.default)(O))).where(w).run();case 8:if(y=n.sent,A=y.rows,A&&A.length){n.next=12;break}return n.abrupt("return");case 12:return n.next=14,h.default.all(A.map(function(){var n=(0,p.default)(f.default.mark(function n(r){var a,i;return f.default.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=r[v],n.next=3,R(e,t,e[m],a,u);case 3:return i=n.sent,O.forEach(function(e){return i[e]=r[e]}),n.abrupt("return",i);case 6:case"end":return n.stop()}},n,void 0)}));return function(e){return n.apply(this,arguments)}}()));case 14:r[i]=n.sent;case 15:case"end":return n.stop()}},n,void 0)}));return function(e){return n.apply(this,arguments)}}()))},R=function(){var e=(0,p.default)(f.default.mark(function e(t,n,r,u){var i,o,d,l,s,c,p=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},v=!(arguments.length>5&&void 0!==arguments[5])||arguments[5];return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(i=r.table+"-"+u,!p.hasOwnProperty(i)){e.next=3;break}return e.abrupt("return",(0,a.default)({},p[i]));case 3:return o=T.default.bind(void 0,n,r),d={id:u},r.deleteField&&(d[r.deleteField]=!1),e.next=8,o().where(d).limit(1).run();case 8:if(l=e.sent,s=l.rows,s&&s.length){e.next=12;break}return e.abrupt("return",void 0);case 12:if(c=s.shift(),p[i]=c,v){e.next=16;break}return e.abrupt("return",(0,a.default)({},c));case 16:return e.next=18,x(t,n,r,c,p);case 18:return e.next=20,N(t,n,r,c,p);case 20:return e.abrupt("return",(0,a.default)({},c));case 21:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u){return e.apply(this,arguments)}}(),O=function(){var e=(0,p.default)(f.default.mark(function e(t,n,r,u,a){var i,o,d,l,c=arguments.length>5&&void 0!==arguments[5]?arguments[5]:{},v=!(arguments.length>6&&void 0!==arguments[6])||arguments[6];return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i=T.default.bind(void 0,n,r),o=(0,s.default)({},u,a),r.deleteField&&(o[r.deleteField]=!1),e.next=5,i().where(o).run();case 5:if(d=e.sent,l=d.rows,l&&l.length){e.next=9;break}return e.abrupt("return",[]);case 9:if(v){e.next=11;break}return e.abrupt("return",l);case 11:return e.abrupt("return",h.default.all(l.map(function(){var e=(0,p.default)(f.default.mark(function e(u){return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x(t,n,r,u,c);case 2:return e.next=4,N(t,n,r,u,c);case 4:return e.abrupt("return",u);case 5:case"end":return e.stop()}},e,void 0)}));return function(t){return e.apply(this,arguments)}}())));case 12:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),w=function(e,t,n){var r={};return(0,b.default)(n.fields).forEach(function(u){var a="findBy"+u.charAt(0).toUpperCase().concat(u.slice(1));return"id"===u?r[a]=R.bind(void 0,e,t,n):void(r[a]=O.bind(void 0,e,t,n,u))}),r};t.default=w},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(11),a=r(u),i=n(9),o=r(i),d=n(26),f=r(d),l=n(8),s=r(l),c=n(22),p=r(c),v=n(23),b=r(v),E=n(25),h=function e(t,n,r){var u=JSON.parse((0,f.default)(t[r]));t[r].hasOwnProperty("afterSave")&&(u.afterSave=t[r].afterSave),t[r].hasOwnProperty("beforeSave")&&(u.beforeSave=t[r].beforeSave);var a=e.bind(void 0,t,n),i={schema:u};return i.select=s.default.bind(void 0,n,u),i.delete=p.default.bind(void 0,n,u),i.insert=E.insertData.bind(void 0,a,t,n,u),i.update=E.updateData.bind(void 0,a,t,n,u),(0,o.default)(i,(0,b.default)(t,n,u))},m=function(e,t){return h.bind(void 0,e,t)};t.default=function(e){var t={};return e.forEach(function(e){return(0,o.default)(t,(0,a.default)({},e.table,e))}),m.bind(void 0,t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.updateData=t.insertData=void 0;var u=n(3),a=r(u),i=n(9),o=r(i),d=n(11),f=r(d),l=n(13),s=r(l),c=n(1),p=r(c),v=n(10),b=r(v),E=n(2),h=r(E),m=n(4),T=n(8),x=r(T),N=n(7),R=r(N),O=function(){var e=(0,h.default)(a.default.mark(function e(t,n,r,u,i,d){var l,c=u.manyToMany;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return l=i.id,e.abrupt("return",b.default.all((0,p.default)(c||{}).map(function(){var e=(0,h.default)(a.default.mark(function e(u){var v,E,m,T,N,R,O,w;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(v=d[u],v&&v.length){e.next=3;break}return e.abrupt("return");case 3:return E=c[u],m=E.table,T=E.primary,N=E.secondary,R=E.schema,O=E.extraFields,w=n[R],e.next=7,b.default.all(v.map(function(e,u){var a=(0,s.default)({},e);(0,p.default)(O).forEach(function(e){return delete a[e]});var i=a.id;return i?_(t,n,r,w,a,{id:i}):A(t,n,r,w,a)}));case 7:return i[u]=e.sent,w.deleteField&&(i[u]=i[u].filter(function(e){return!e[w.deleteField]})),e.next=11,b.default.all(v.map(function(){var e=(0,h.default)(a.default.mark(function e(d,s){var c,v,b,E,h,R,w,y;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return v={},(0,p.default)(O).forEach(function(e){return v[e]=d[e]}),b=i[u][s].id,v[T]=l,v[N]=b,E=x.default.bind(void 0,r,n[m]),e.next=8,E("id").from(m).where((c={},(0,f.default)(c,T,l),(0,f.default)(c,N,b),c)).limit(1).run();case 8:if(h=e.sent,R=h.rows,w=R&&R.length?R.shift().id:void 0,!w){e.next=17;break}return e.next=14,_(t,n,r,n[m],v,{id:w});case 14:e.t0=e.sent,e.next=20;break;case 17:return e.next=19,A(t,n,r,n[m],v);case 19:e.t0=e.sent;case 20:y=e.t0,(0,p.default)(O).forEach(function(e){return(0,o.default)(i[u][s],(0,f.default)({},e,y[e]))});case 22:case"end":return e.stop()}},e,void 0)}));return function(t,n){return e.apply(this,arguments)}}()));case 11:case"end":return e.stop()}},e,void 0)}));return function(t){return e.apply(this,arguments)}}())));case 2:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a,i){return e.apply(this,arguments)}}(),w=function(){var e=(0,h.default)(a.default.mark(function e(t,n,r,u,i,o){var d,l=u.hasMany;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return d=i.id,e.next=3,b.default.all((0,p.default)(l||{}).map(function(){var e=(0,h.default)(a.default.mark(function e(u){var c,p,v,E,h;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(c=o[u],c&&c.length){e.next=3;break}return e.abrupt("return");case 3:return p=l[u],v=p.table,E=p.field,h=n[v],e.next=7,b.default.all(c.map(function(e,u){var a=(0,s.default)({},e,(0,f.default)({},E,d)),i=a.id;return i?_(t,n,r,h,a,{id:i}):A(t,n,r,h,a)}));case 7:i[u]=e.sent,h.deleteField&&(i[u]=i[u].filter(function(e){return!e[h.deleteField]}));case 9:case"end":return e.stop()}},e,void 0)}));return function(t){return e.apply(this,arguments)}}()));case 3:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a,i){return e.apply(this,arguments)}}(),y=function(){var e=(0,h.default)(a.default.mark(function e(t,n,r,u,i,o){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w(t,n,r,u,i,o);case 2:return e.next=4,O(t,n,r,u,i,o);case 4:return e.abrupt("return",i);case 5:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a,i){return e.apply(this,arguments)}}(),A=t.insertData=function(){var e=(0,h.default)(a.default.mark(function e(t,n,r,u,i){var o,d,f,l,s,c,v,b,E;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=void 0,!u.hasOwnProperty("beforeSave")){e.next=5;break}return e.next=4,u.beforeSave(i,t(u.table),t);case 4:o=e.sent;case 5:return o&&(0,p.default)(o).length&&(i=o),d=(0,m.insertTable)(u).objValues(i),f=d.values,l=d.toSQL(),e.next=11,r.execute(l,f);case 11:if(s=e.sent,c=s.rows,c&&c.length){e.next=15;break}return e.abrupt("return",void 0);case 15:if(v=c.map(R.default.bind(void 0,u)).shift(),b=void 0,!u.hasOwnProperty("afterSave")){e.next=21;break}return e.next=20,u.afterSave(v,t(u.table),t);case 20:b=e.sent;case 21:return b&&b.id&&(v=b),e.next=24,y(t,n,r,u,v,i);case 24:return E=e.sent,u.ignoreFields&&u.ignoreFields.forEach(function(e){return delete E[e]}),e.abrupt("return",E);case 27:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),_=t.updateData=function(){var e=(0,h.default)(a.default.mark(function e(t,n,r,u,i,o){var d,f,l,s,c,v,b,E,h;return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(d=void 0,!u.hasOwnProperty("beforeSave")){e.next=5;break}return e.next=4,u.beforeSave(i,t(u.table),t);case 4:d=e.sent;case 5:return d&&(0,p.default)(d).length&&(i=d),f=(0,m.updateTable)(u).objValues(i,o),l=f.values,s=f.toSQL(),e.next=11,r.execute(s,l);case 11:if(c=e.sent,v=c.rows,v&&v.length){e.next=15;break}return e.abrupt("return",void 0);case 15:if(b=v.map(R.default.bind(void 0,u)).shift(),E=void 0,!u.hasOwnProperty("afterSave")){e.next=21;break}return e.next=20,u.afterSave(b,t(u.table),t);case 20:E=e.sent;case 21:return E&&E.id&&(b=E),e.next=24,y(t,n,r,u,b,i);case 24:return h=e.sent,u.ignoreFields&&u.ignoreFields.forEach(function(e){return delete h[e]}),e.abrupt("return",h);case 27:case"end":return e.stop()}},e,void 0)}));return function(t,n,r,u,a,i){return e.apply(this,arguments)}}()},function(e,t){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,t){e.exports=require("babel-runtime/helpers/toConsumableArray")},function(e,t){e.exports=require("pg")}]);
//# sourceMappingURL=q-postgres.js.map