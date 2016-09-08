module.exports=function(e){function t(r){if(n[r])return n[r].exports;var u=n[r]={exports:{},id:r,loaded:!1};return e[r].call(u.exports,u,u.exports,t),u.loaded=!0,u.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.types=void 0;var u=n(27),a=n(22),i=r(a),o=n(13),d=r(o),f=n(2),s=r(f);t.types=s["default"];t["default"]=function(e){var t=new u.Pool(e),n=d["default"].bind(void 0,t);return{connect:n,orm:i["default"]}}},function(e,t){e.exports=require("babel-runtime/core-js/object/keys")},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=t.TEXT="TEXT",r=t.NAME="VARCHAR(255)",u=t.DATE="DATE",a=t.CHAR1="CHAR(1)",i=t.CHAR2="CHAR(2)",o=t.CHAR8="CHAR(8)",d=t.EMAIL="VARCHAR(50)",f=t.PHONE="VARCHAR(30)",s=t.MONEY="NUMERIC(15,2)",l=t.STRING="VARCHAR(255)",c=t.SELECT="VARCHAR(25)",p=t.BOOLEAN="BOOLEAN",v=t.INTEGER="INTEGER",b=t.CPFCNPJ="VARCHAR(14)",E=t.PERCENT="NUMERIC(15,8)",m=t.PRIMARY="SERIAL PRIMARY KEY",h=t.DATETIME="TIMESTAMP",T=t.REFERENCES="REFERENCES",N=t.NOT_NULL="NOT NULL";t["default"]={TEXT:n,DATE:u,NAME:r,CHAR1:a,CHAR2:i,CHAR8:o,EMAIL:d,PHONE:f,MONEY:s,STRING:l,SELECT:c,BOOLEAN:p,INTEGER:v,CPFCNPJ:b,PERCENT:E,PRIMARY:m,DATETIME:h,REFERENCES:T,NOT_NULL:N}},function(e,t){e.exports=require("babel-runtime/helpers/asyncToGenerator")},function(e,t){e.exports=require("babel-runtime/helpers/defineProperty")},function(e,t){e.exports=require("babel-runtime/regenerator")},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={eq:"=",lt:"<",gt:">",lq:"<=",gq:">=",df:"<>",lk:"like","==":"=","<<":"<",">>":">","<=":"<=",">=":">=","<>":"<>","%%":"like"};t["default"]=function(e){var t=n.eq;if("string"!=typeof e)return{comparator:t,value:e};var r=e.split(":"),u=r.shift();if(!n.hasOwnProperty(u))return{comparator:t,value:e};t=n[u];var a=r.join(":").trim();return{comparator:t,value:"like"===t?"%"+a+"%":a}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(5),a=r(u),i=n(3),o=r(i),d=n(1),f=r(d),s=n(10);t["default"]=function(e,t){for(var n=arguments.length,r=Array(n>2?n-2:0),u=2;u<n;u++)r[u-2]=arguments[u];r&&r.length||(r=(0,f["default"])(t.fields));var i=(0,s.selectTable)();return i.from(t.table),r.forEach(function(e){return i.field(e)}),i.run=(0,o["default"])(a["default"].mark(function d(){var t,n;return a["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t=i.values,n=i.toSQL(),r.abrupt("return",e.execute(n,t));case 3:case"end":return r.stop()}},d,void 0)})),i}},function(e,t){e.exports=require("babel-runtime/core-js/object/assign")},function(e,t){e.exports=require("babel-runtime/core-js/promise")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.selectTable=t.deleteTable=t.updateTable=t.insertTable=t.createTable=t.alterTable=t.dropTable=void 0;var u=n(17),a=r(u),i=n(14),o=r(i),d=n(15),f=r(d),s=n(18),l=r(s),c=n(20),p=r(c),v=n(16),b=r(v),E=n(19),m=r(E),h=t.dropTable=a["default"],T=t.alterTable=o["default"],N=t.createTable=f["default"],R=t.insertTable=l["default"],x=t.updateTable=p["default"],_=t.deleteTable=b["default"],A=t.selectTable=m["default"];t["default"]={dropTable:h,alterTable:T,createTable:N,insertTable:R,updateTable:x,deleteTable:_,selectTable:A}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.formatDate=void 0;var u=n(4),a=r(u),i=n(8),o=r(i),d=n(1),f=r(d),s=n(2),l=t.formatDate=function(e){var t=new Date(e),n=("0"+t.getDate()).substr(-2),r=("0"+(t.getMonth()+1)).substr(-2);return t.getFullYear()+"-"+r+"-"+n};t["default"]=function(e,t){var n={};return(0,f["default"])(e.fields).forEach(function(r){var u=t[r.toLowerCase()];e.fields[r]===s.DATE&&(u=l(u)),(0,o["default"])(n,(0,a["default"])({},r,u))}),n}},function(e,t){e.exports=require("babel-runtime/helpers/typeof")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(9),a=r(u),i=n(5),o=r(i),d=n(3),f=r(d),s="BEGIN",l="COMMIT",c="ROLLBACK",p=function(){var e=(0,f["default"])(o["default"].mark(function t(e){var n,r;return o["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.connect();case 2:if(n=t.sent,r=n.errno,!r){t.next=6;break}throw new Error(n.message);case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}},t,void 0)}));return function(t){return e.apply(this,arguments)}}(),v=function(e,t){var n=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];return new a["default"](function(r,u){e.query(t,n,function(e,t){return e?u(e):void r(t)})})};t["default"]=function(){var e=(0,f["default"])(o["default"].mark(function t(e){var n,r;return o["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p(e);case 2:return n=t.sent,r={release:function(){var e=(0,f["default"])(o["default"].mark(function t(){return o["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.release());case 1:case"end":return e.stop()}},t,void 0)}));return function(){return e.apply(this,arguments)}}(),execute:v.bind(void 0,n),commit:function(){var e=(0,f["default"])(o["default"].mark(function t(){return o["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(n,l);case 2:return e.abrupt("return",r);case 3:case"end":return e.stop()}},t,void 0)}));return function(){return e.apply(this,arguments)}}(),rollback:function(){var e=(0,f["default"])(o["default"].mark(function t(){return o["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(n,c);case 2:return e.abrupt("return",r);case 3:case"end":return e.stop()}},t,void 0)}));return function(){return e.apply(this,arguments)}}(),startTransaction:function(){var e=(0,f["default"])(o["default"].mark(function t(){return o["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v(n,s);case 2:return e.abrupt("return",r);case 3:case"end":return e.stop()}},t,void 0)}));return function(){return e.apply(this,arguments)}}()},t.abrupt("return",r);case 5:case"end":return t.stop()}},t,void 0)}));return function(t){return e.apply(this,arguments)}}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),a=r(u),i=n(2),o="\n",d=function(e,t,n,r,u,o){var d=t.adds,f="",s="";return u&&(f=" NOT NULL"),void 0!==o&&(s=["boolean","number",""].indexOf("undefined"==typeof o?"undefined":(0,a["default"])(o))>-1?" DEFAULT "+String(o).toUpperCase():" DEFAULT '"+o+"'"),d.push("ADD COLUMN "+n+" "+(r===i.REFERENCES?i.INTEGER:r)+f+s),e},f=function(e,t,n){var r=t.drops;return r.push("DROP COLUMN "+n+" RESTRICT"),e},s=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" DROP DEFAULT"),e},l=function(e,t,n,r){var u=t.alters,i="";return void 0!==r&&(i=["boolean","number",""].indexOf("undefined"==typeof r?"undefined":(0,a["default"])(r))>-1?""+String(r).toUpperCase():"'"+r+"'"),u.push("ALTER COLUMN "+n+" SET DEFAULT "+i),e},c=function(e){var t=e.tableName,n=e.adds,r=e.alters,u=e.drops,a=e.indexs;return("\nALTER TABLE "+t+" (\n  "+n.concat(r,u,a).join(","+o+"  ")+"\n);\n").trim()},p=function(e,t,n,r){var u=t.alters;return u.push("ALTER COLUMN "+n+" TYPE "+(r===i.REFERENCES?i.INTEGER:r)),e},v=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" DROP NOT NULL"),e},b=function(e,t,n){var r=t.alters;return r.push("ALTER COLUMN "+n+" SET NOT NULL"),e},E=function(e,t,n,r){var u=t.alters;return u.push("RENAME COLUMN "+n+" TO "+r),e},m=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("ADD CONSTRAINT unique_"+r+"_"+n+" UNIQUE ("+n+")"),e},h=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("DROP CONSTRAINT unique_"+r+"_"+n),e},T=function(e,t,n,r,u){var a=t.tableName,i=t.indexs;return i.push("ADD CONSTRAINT foreign_"+a+"_"+n+" FOREIGN KEY ("+n+") REFERENCES "+r+" ("+(u?u:"id")+")"),e},N=function(e,t,n){var r=t.tableName,u=t.indexs;return u.push("DROP CONSTRAINT foreign_"+r+"_"+n),e};t["default"]=function(e){var t={tableName:e,adds:[],drops:[],alters:[],indexs:[]},n={};return n.toSQL=c.bind(void 0,t),n.setType=p.bind(void 0,n,t),n.addColumn=d.bind(void 0,n,t),n.addUnique=m.bind(void 0,n,t),n.dropUnique=h.bind(void 0,n,t),n.dropColumn=f.bind(void 0,n,t),n.setDefault=l.bind(void 0,n,t),n.setNotNull=b.bind(void 0,n,t),n.dropNotNull=v.bind(void 0,n,t),n.dropDefault=s.bind(void 0,n,t),n.renameColumn=E.bind(void 0,n,t),n.addForeign=T.bind(void 0,n,t),n.dropForeign=N.bind(void 0,n,t),n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(12),a=r(u),i=n(2),o="\n",d=function(e,t,n,r,u,o){var d=t.columns,f="",s="";return u&&(f=" NOT NULL"),void 0!==o&&(s=["boolean","number",""].indexOf("undefined"==typeof o?"undefined":(0,a["default"])(o))>-1?" DEFAULT "+String(o).toUpperCase():" DEFAULT '"+o+"'"),d.push(n+" "+(r===i.REFERENCES?i.INTEGER:r)+f+s),e},f=function(e,t,n){var r=t.tableName,u=t.uniques;return u.push("CONSTRAINT unique_"+r+"_"+n+" UNIQUE ("+n+")"),e},s=function(e,t,n,r,u){var a=t.tableName,i=t.foreigns;return i.push("CONSTRAINT foreign_"+a+"_"+n+" FOREIGN KEY ("+n+") REFERENCES "+r+" ("+(u?u:"id")+")"),e},l=function(e){var t=e.tableName,n=e.columns,r=e.uniques,u=e.foreigns;return("\nCREATE TABLE "+t+" (\n  "+n.concat(r,u).join(","+o+"  ")+"\n);\n").trim()};t["default"]=function(e){var t={tableName:e,columns:[],uniques:[],foreigns:[]},n={};return n.toSQL=l.bind(void 0,t),n.unique=f.bind(void 0,n,t),n.column=d.bind(void 0,n,t),n.foreign=s.bind(void 0,n,t),n}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=n(6),o=r(i),d="\n",f=function(e){var t=e.schema,n=e.conditions,r=t.table,u=t.fields,i=n&&n.length?d+"WHERE ("+n.join(")"+d+"  AND (")+")":"";return("\nDELETE FROM "+r+i+"\nRETURNING "+(0,a["default"])(u).join(", ")+";\n").trim()},s=function(e,t){return e.values=[],e.conditions=(0,a["default"])(t||{}).map(function(n,r){var u=(0,o["default"])(t[n]),a=u.comparator,i=u.value;return e.values.push(i),n+" "+a+" $"+(r+1)}),e};t["default"]=function(e){var t={schema:e,values:[],conditions:[]};return t.toSQL=f.bind(void 0,t),t.objValues=s.bind(void 0,t),t}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return("\nDROP TABLE "+e+";\n").trim()};t["default"]=function(e){var t={};return t.toSQL=n.bind(void 0,e),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=function(e){var t=e.schema,n=e.listFields,r=e.paramters,u=t.table,i=t.fields;return("\nINSERT INTO "+u+" ("+n.join(", ")+")\nVALUES ("+r.join(", ")+")\nRETURNING "+(0,a["default"])(i).join(", ")+";\n").trim()},o=function(e,t){var n=e.schema,r=n.fields;return e.listFields=(0,a["default"])(t).filter(function(e){return r.hasOwnProperty(e)&&void 0!==t[e]}),e.values=e.listFields.map(function(e){return t[e]}),e.paramters=e.listFields.map(function(e,t){return"$"+(t+1)}),e};t["default"]=function(e){var t={schema:e,values:{}};return t.toSQL=i.bind(void 0,t),t.objValues=o.bind(void 0,t),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=n(6),o=r(i),d="\n",f=function(e,t){return e.fields.push(t),e},s=function(e,t,n){return n||(n=""),e.order.push((t+" "+n.toUpperCase()).trim()),e},l=function(e,t){return e.group.push(t),e},c=function(e,t){return e.tableName=t,e},p=function(e,t){return e.limitRows=t,e},v=function(e,t){return e.conditions=(0,a["default"])(t||{}).map(function(n,r){var u=(0,o["default"])(t[n]),a=u.comparator,i=u.value;return e.values.push(i),n+" "+a+" $"+(r+1)}),e},b=function(e){var t=e.tableName,n=e.fields,r=e.order,u=e.group,a=e.conditions,i=e.limitRows,o=i?d+"LIMIT "+i:"",f=r&&r.length?d+"ORDER BY "+r.join(", "):"",s=u&&u.length?d+"GROUP BY "+u.join(", "):"",l=a&&a.length?d+"WHERE ("+a.join(")"+d+"  AND (")+")":"";return("\nSELECT "+n.join(", ")+"\nFROM "+t+l+s+f+o+"\n  ").trim()};t["default"]=function(){var e={tableName:"",fields:[],order:[],group:[],values:[]};return e.from=c.bind(void 0,e),e.field=f.bind(void 0,e),e.toSQL=b.bind(void 0,e),e.where=v.bind(void 0,e),e.limit=p.bind(void 0,e),e.orderBy=s.bind(void 0,e),e.groupBy=l.bind(void 0,e),e}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(1),a=r(u),i=n(6),o=r(i),d="\n",f=function(e){var t=e.schema,n=e.paramters,r=e.conditions,u=t.table,i=t.fields,o=r&&r.length?d+"WHERE ("+r.join(")"+d+"  AND (")+")":"";return("\nUPDATE "+u+" SET\n  "+n.join(","+d+"  ")+o+"\nRETURNING "+(0,a["default"])(i).join(", ")+";\n").trim()},s=function(e,t,n){var r=e.schema,u=r.fields,i=(0,a["default"])(t).filter(function(e){return u.hasOwnProperty(e)&&void 0!==t[e]});return e.values=i.map(function(e){return t[e]}),e.paramters=i.map(function(e,t){return e+" = $"+(t+1)}),e.conditions=(0,a["default"])(n||{}).map(function(t,r){var u=(0,o["default"])(n[t]),a=u.comparator,d=u.value;return e.values.push(d),t+" "+a+" $"+(i.length+r+1)}),e};t["default"]=function(e){var t={schema:e,values:[],conditions:[]};return t.toSQL=f.bind(void 0,t),t.objValues=s.bind(void 0,t),t}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(26),a=r(u),i=n(5),o=r(i),d=n(4),f=r(d),s=n(1),l=r(s),c=n(9),p=r(c),v=n(3),b=r(v),E=n(7),m=r(E),h=n(11),T=r(h),N=function(){var e=(0,b["default"])(o["default"].mark(function t(e,n,r,u,a){var i;return o["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=r.hasMany,t.next=3,p["default"].all((0,l["default"])(i||{}).map(function(){var t=(0,b["default"])(o["default"].mark(function r(t){var d,s,l,c,v,b,E;return o["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return d=i[t],s=d.table,l=d.field,c=e[s],v=m["default"].bind(void 0,n,c),r.next=7,v("id").where((0,f["default"])({},l,u.id)).run();case 7:return b=r.sent,E=b.rows,r.next=11,p["default"].all(E.map(function(t){var r=t.id;return x(e,n,c,r,a)}));case 11:u[t]=r.sent;case 12:case"end":return r.stop()}},r,void 0)}));return function(e){return t.apply(this,arguments)}}()));case 3:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),R=function(){var e=(0,b["default"])(o["default"].mark(function t(e,n,r,u,i){var d;return o["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return d=r.manyToMany,t.next=3,p["default"].all((0,l["default"])(d||{}).map(function(){var t=(0,b["default"])(o["default"].mark(function r(t){var s,c,v,E,h,T,N,R,_,A,O;return o["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s=d[t],c=s.table,v=s.primary,E=s.secondary,h=s.extraFields,T=s.schema,N=e[c],R=m["default"].bind(void 0,n,N),_=(0,l["default"])(h),r.next=11,R.apply(void 0,[E].concat((0,a["default"])(_))).where((0,f["default"])({},v,u.id)).run();case 11:return A=r.sent,O=A.rows,r.next=15,p["default"].all(O.map(function(){var t=(0,b["default"])(o["default"].mark(function r(t){var u,a;return o["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return u=t[E],r.next=3,x(e,n,e[T],u,i);case 3:return a=r.sent,_.forEach(function(e){return a[e]=t[e]}),r.abrupt("return",a);case 6:case"end":return r.stop()}},r,void 0)}));return function(e){return t.apply(this,arguments)}}()));case 15:u[t]=r.sent;case 16:case"end":return r.stop()}},r,void 0)}));return function(e){return t.apply(this,arguments)}}()));case 3:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),x=function(){var e=(0,b["default"])(o["default"].mark(function t(e,n,r,u){var a,i,d,f,s,l=arguments.length<=4||void 0===arguments[4]?{}:arguments[4];return o["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=r.table+"-"+u,!l.hasOwnProperty(a)){t.next=3;break}return t.abrupt("return",l[a]);case 3:return i=m["default"].bind(void 0,n,r),t.next=6,i().where({id:u}).limit(1).run();case 6:return d=t.sent,f=d.rows,s=f.map(T["default"].bind(void 0,r)).shift(),l[a]=s,t.next=12,N(e,n,r,s,l);case 12:return t.next=14,R(e,n,r,s,l);case 14:return t.abrupt("return",s);case 15:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}();t["default"]=x},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var u=n(4),a=r(u),i=n(8),o=r(i),d=n(24),f=r(d),s=n(21),l=r(s),c=n(7),p=r(c),v=n(23),b=function(e,t,n){var r=JSON.parse((0,f["default"])(e[n])),u={schema:r};return u.select=p["default"].bind(void 0,t,r),u.insert=v.insertData.bind(void 0,e,t,r),u.update=v.updateData.bind(void 0,e,t,r),u.findById=l["default"].bind(void 0,e,t,r),u},E=function(e,t){return b.bind(void 0,e,t)};t["default"]=function(e){var t={};return e.forEach(function(e){return(0,o["default"])(t,(0,a["default"])({},e.table,e))}),E.bind(void 0,t)}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.updateData=t.insertData=void 0;var u=n(5),a=r(u),i=n(4),o=r(i),d=n(8),f=r(d),s=n(25),l=r(s),c=n(1),p=r(c),v=n(9),b=r(v),E=n(3),m=r(E),h=n(10),T=n(7),N=r(T),R=n(11),x=r(R),_=function(){var e=(0,m["default"])(a["default"].mark(function t(e,n,r,u,i){var d,s=r.manyToMany;return a["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return d=u.id,t.abrupt("return",b["default"].all((0,p["default"])(s||{}).map(function(){var t=(0,m["default"])(a["default"].mark(function r(t){var c,v,E,h,T,R,x,_;return a["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(c=i[t],c&&c.length){r.next=3;break}return r.abrupt("return");case 3:return v=s[t],E=v.table,h=v.primary,T=v.secondary,R=v.schema,x=v.extraFields,_=e[R],r.next=12,b["default"].all(c.map(function(t,r){var u=(0,l["default"])({},t);(0,p["default"])(x).forEach(function(e){return delete u[e]});var a=u.id;return a?w(e,n,_,u,{id:a}):y(e,n,_,u)}));case 12:return u[t]=r.sent,r.next=15,b["default"].all(c.map(function(){var r=(0,m["default"])(a["default"].mark(function i(r,s){var l,c,v,b,m,R,_,A;return a["default"].wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return c={},(0,p["default"])(x).forEach(function(e){return c[e]=r[e]}),v=u[t][s].id,c[h]=d,c[T]=v,b=N["default"].bind(void 0,n,e[E]),a.next=8,b("id").from("kinships").where((l={},(0,o["default"])(l,h,d),(0,o["default"])(l,T,v),l)).limit(1).run();case 8:if(m=a.sent,R=m.rows,_=R&&R.length?R.shift().id:void 0,!_){a.next=17;break}return a.next=14,w(e,n,e[E],c,{id:_});case 14:a.t0=a.sent,a.next=20;break;case 17:return a.next=19,y(e,n,e[E],c);case 19:a.t0=a.sent;case 20:A=a.t0,(0,p["default"])(x).forEach(function(e){return(0,f["default"])(u[t][s],(0,o["default"])({},e,A[e]))});case 22:case"end":return a.stop()}},i,void 0)}));return function(e,t){return r.apply(this,arguments)}}()));case 15:case"end":return r.stop()}},r,void 0)}));return function(e){return t.apply(this,arguments)}}())));case 2:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),A=function(){var e=(0,m["default"])(a["default"].mark(function t(e,n,r,u,i){var d,f=r.hasMany;return a["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return d=u.id,t.next=3,b["default"].all((0,p["default"])(f||{}).map(function(){var t=(0,m["default"])(a["default"].mark(function r(t){var s,c,p,v,E;return a["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(s=i[t],s&&s.length){r.next=3;break}return r.abrupt("return");case 3:return c=f[t],p=c.table,v=c.field,E=e[p],r.next=9,b["default"].all(s.map(function(t,r){var u=(0,l["default"])({},t,(0,o["default"])({},v,d)),a=u.id;return a?w(e,n,E,u,{id:a}):y(e,n,E,u)}));case 9:u[t]=r.sent;case 10:case"end":return r.stop()}},r,void 0)}));return function(e){return t.apply(this,arguments)}}()));case 3:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),O=function(){var e=(0,m["default"])(a["default"].mark(function t(e,n,r,u,i){return a["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,A(e,n,r,u,i);case 2:return t.next=4,_(e,n,r,u,i);case 4:return t.abrupt("return",u);case 5:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}(),y=t.insertData=function(){var e=(0,m["default"])(a["default"].mark(function t(e,n,r,u){var i,o,d,f,s,l;return a["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return i=(0,h.insertTable)(r).objValues(u),o=i.values,d=i.toSQL(),t.next=5,n.execute(d,o);case 5:return f=t.sent,s=f.rows,l=s.map(x["default"].bind(void 0,r)).shift(),t.abrupt("return",O(e,n,r,l,u));case 9:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u){return e.apply(this,arguments)}}(),w=t.updateData=function(){var e=(0,m["default"])(a["default"].mark(function t(e,n,r,u,i){var o,d,f,s,l,c;return a["default"].wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=(0,h.updateTable)(r).objValues(u,i),d=o.values,f=o.toSQL(),t.next=5,n.execute(f,d);case 5:return s=t.sent,l=s.rows,c=l.map(x["default"].bind(void 0,r)).shift(),t.abrupt("return",O(e,n,r,c,u));case 9:case"end":return t.stop()}},t,void 0)}));return function(t,n,r,u,a){return e.apply(this,arguments)}}()},function(e,t){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,t){e.exports=require("babel-runtime/helpers/extends")},function(e,t){e.exports=require("babel-runtime/helpers/toConsumableArray")},function(e,t){e.exports=require("pg")}]);
//# sourceMappingURL=q-postgres.js.map