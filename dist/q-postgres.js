module.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=18)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=t.TEXT="TEXT",r=t.CITEXT="CITEXT",i=t.NAME="VARCHAR(255)",o=t.DATE="DATE",s=t.JSON="JSON",l=t.JSONB="JSONB",d=t.CHAR1="CHAR(1)",u=t.CHAR2="CHAR(2)",c=t.CHAR8="CHAR(8)",f=t.EMAIL="VARCHAR(50)",b=t.PHONE="VARCHAR(30)",p=t.MONEY="NUMERIC(15,2)",E=t.STRING="VARCHAR(255)",v=t.SELECT="VARCHAR(25)",O=t.BOOLEAN="BOOLEAN",T=t.INTEGER="INTEGER",N=t.SMALLINT="SMALLINT",m=t.CPFCNPJ="VARCHAR(14)",$=t.PERCENT="NUMERIC(15,8)",R=t.PRIMARY="SERIAL PRIMARY KEY",y=t.DATETIME="TIMESTAMP",h=t.REFERENCES="REFERENCES",j=t.NOT_NULL="NOT NULL";t.default={TEXT:a,DATE:o,JSON:s,NAME:i,CHAR1:d,CHAR2:u,CHAR8:c,EMAIL:f,PHONE:b,MONEY:p,JSONB:l,STRING:E,SELECT:v,CITEXT:r,BOOLEAN:O,INTEGER:T,CPFCNPJ:m,PERCENT:$,PRIMARY:R,DATETIME:y,SMALLINT:N,NOT_NULL:j,REFERENCES:h}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.selectTable=t.deleteTable=t.updateTable=t.insertTable=t.createTable=t.alterTable=t.dropTable=void 0;var a=u(n(15)),r=u(n(14)),i=u(n(13)),o=u(n(12)),s=u(n(11)),l=u(n(10)),d=u(n(9));function u(e){return e&&e.__esModule?e:{default:e}}const c=t.dropTable=a.default,f=t.alterTable=r.default,b=t.createTable=i.default,p=t.insertTable=o.default,E=t.updateTable=s.default,v=t.deleteTable=l.default,O=t.selectTable=d.default;t.default={dropTable:c,alterTable:f,createTable:b,insertTable:p,updateTable:E,deleteTable:v,selectTable:O}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.formatInteger=t.formatFloat=t.formatDate=void 0;var a=n(0);const r=t.formatDate=(e=>{if(!e||!String(e).trim())return null;const t=new Date(e),n=`0${t.getDate()}`.substr(-2),a=`0${t.getMonth()+1}`.substr(-2);return`${t.getFullYear()}-${a}-${n}`}),i=t.formatFloat=(e=>e&&String(e).trim()?parseFloat(e):null),o=t.formatInteger=(e=>e&&String(e).trim()?parseInt(e,10):null);t.default=((e,t)=>(Object.keys(e.fields).forEach(n=>{const s=String(n||"").toLowerCase(),l=Boolean(n!==s),d=l?s:n;if(!t.hasOwnProperty(d))return;let u=t[d];e.fields[n]===a.DATE&&(u=r(u)),[a.MONEY,a.PERCENT].indexOf(e.fields[n])>-1&&(u=i(u)),[a.INTEGER,a.REFERENCES].indexOf(e.fields[n])>-1&&(u=o(u)),t[n]=u,l&&delete t[d]}),t))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a={eq:"=",lt:"<",gt:">",lq:"<=",gq:">=",df:"<>",lk:"like","==":"=","<<":"<",">>":">","<=":"<=",">=":">=","<>":"<>","%%":"like"};t.default=(e=>{let t=a.eq;if("string"!=typeof e)return{comparator:t,value:e};const n=e.split(":"),r=n.shift();if(!a.hasOwnProperty(r))return{comparator:t,value:e};t=a[r];const i=n.join(":").trim();return{comparator:t,value:"like"===t?`%${i}%`:i}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(1),i=n(2),o=(a=i)&&a.__esModule?a:{default:a};t.default=((e,t,...n)=>{n&&n.length||(n=Object.keys(t.fields));let a=(0,r.selectTable)();return a.from(t.table),n.forEach(e=>a.field(e)),a.run=(async()=>{const n=a.values,r=a.toSQL(),i=await e.execute(r,n);return i.rows&&i.rows.length&&(i.rows=i.rows.map(o.default.bind(void 0,t))),i}),a})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const a=(e,t,n=[])=>new Promise((a,r)=>{e.query(t,n,(i,o)=>{if(e.config.debug&&console.log(`\n--------------------------\nSQL => ${t}\n\nPARAMS => ${n.join(", ")}\n\nERROR => ${i}\n\nRESULT => ${o}\n--------------------------\n        `),i)return r(i);a(o)})});t.default=(async(e,t)=>{const n=await(async e=>{const t=await e.connect(),{errno:n}=t;if(n)throw new Error(t.message);return t})(e);n.config=t;const r={release:async()=>n.release(),execute:a.bind(void 0,n),commit:async()=>(await a(n,"COMMIT"),r),rollback:async()=>(await a(n,"ROLLBACK"),r),startTransaction:async()=>(await a(n,"BEGIN"),r)};return r})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.updateData=t.insertData=void 0;var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},r=n(1),i=s(n(4)),o=s(n(2));function s(e){return e&&e.__esModule?e:{default:e}}const l=async(e,t,n,r,o,s)=>(await(async(e,t,n,{hasMany:r},i,o)=>{const{id:s}=i;await Promise.all(Object.keys(r||{}).map(async l=>{const c=o[l];if(!c||!c.length)return;const{table:f,field:b}=r[l],p=t[f];i[l]=await Promise.all(c.map((r,i)=>{const o=a({},r,{[b]:s}),l=o.id;return l?u(e,t,n,p,o,{id:l}):d(e,t,n,p,o)})),p.deleteField&&(i[l]=i[l].filter(e=>!e[p.deleteField]))}))})(e,t,n,r,o,s),await(async(e,t,n,{manyToMany:r},o,s)=>{const{id:l}=o;return Promise.all(Object.keys(r||{}).map(async c=>{const f=s[c];if(!f||!f.length)return;const{table:b,primary:p,secondary:E,schema:v,extraFields:O}=r[c],T=t[v];o[c]=await Promise.all(f.map((r,i)=>{let o=a({},r);Object.keys(O).forEach(e=>delete o[e]);const s=o.id;return s?u(e,t,n,T,o,{id:s}):d(e,t,n,T,o)})),T.deleteField&&(o[c]=o[c].filter(e=>!e[T.deleteField])),await Promise.all(f.map(async(a,r)=>{const s={};Object.keys(O).forEach(e=>s[e]=a[e]);const f=o[c][r].id;s[p]=l,s[E]=f;const v=i.default.bind(void 0,n,t[b]),{rows:T}=await v("id").from(b).where({[p]:l,[E]:f}).limit(1).run(),N=T&&T.length?T.shift().id:void 0,m=N?await u(e,t,n,t[b],s,{id:N}):await d(e,t,n,t[b],s);Object.keys(O).forEach(e=>Object.assign(o[c][r],{[e]:m[e]}))}))}))})(e,t,n,r,o,s),o),d=t.insertData=(async(e,t,n,a,i)=>{let s;a.hasOwnProperty("beforeSave")&&(s=await a.beforeSave(i,e(a.table),e)),s&&Object.keys(s).length&&(i=s);const d=(0,r.insertTable)(a).objValues(i),u=d.values,c=d.toSQL(),{rows:f}=await n.execute(c,u);if(!f||!f.length)return;let b,p=f.map(o.default.bind(void 0,a)).shift();a.hasOwnProperty("afterSave")&&(b=await a.afterSave(p,e(a.table),e)),b&&b.id&&(p=b);const E=await l(e,t,n,a,p,i);return a.ignoreFields&&a.ignoreFields.forEach(e=>delete E[e]),E}),u=t.updateData=(async(e,t,n,a,i,s)=>{let d;a.hasOwnProperty("beforeSave")&&(d=await a.beforeSave(i,e(a.table),e)),d&&Object.keys(d).length&&(i=d);const u=(0,r.updateTable)(a).objValues(i,s),c=u.values,f=u.toSQL(),{rows:b}=await n.execute(f,c);if(!b||!b.length)return;let p,E=b.map(o.default.bind(void 0,a)).shift();a.hasOwnProperty("afterSave")&&(p=await a.afterSave(E,e(a.table),e)),p&&p.id&&(E=p);const v=await l(e,t,n,a,E,i);return a.ignoreFields&&a.ignoreFields.forEach(e=>delete v[e]),v})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},i=n(4),o=(a=i)&&a.__esModule?a:{default:a};const s=(e,t,n,a,r)=>{const{hasMany:i}=n;return Promise.all(Object.keys(i||{}).map(async n=>{const{table:s,field:l}=i[n],u=e[s],c=o.default.bind(void 0,t,u);let f={[l]:a.id};u.deleteField&&(f[u.deleteField]=!1);const{rows:b}=await c("id").where(f).run();b&&b.length&&(a[n]=await Promise.all(b.map(({id:n})=>d(e,t,u,n,r))))}))},l=(e,t,n,a,r)=>{const{manyToMany:i}=n;return Promise.all(Object.keys(i||{}).map(async n=>{const{table:s,primary:l,secondary:u,extraFields:c,schema:f}=i[n],b=e[s],p=o.default.bind(void 0,t,b),E=Object.keys(c);let v={[l]:a.id};b.deleteField&&(v[b.deleteField]=!1);const{rows:O}=await p(u,...E).where(v).run();O&&O.length&&(a[n]=await Promise.all(O.map(async n=>{const a=n[u],i=await d(e,t,e[f],a,r);return E.forEach(e=>i[e]=n[e]),i})))}))},d=async(e,t,n,a,i={},d=!0)=>{const u=`${n.table}-${a}`;if(i.hasOwnProperty(u))return r({},i[u]);const c=o.default.bind(void 0,t,n);let f={id:a};n.deleteField&&(f[n.deleteField]=!1);const{rows:b}=await c().where(f).limit(1).run();if(!b||!b.length)return;const p=b.shift();return i[u]=p,d?(await s(e,t,n,p,i),await l(e,t,n,p,i),r({},p)):r({},p)};t.default=((e,t,n)=>{const a={};return Object.keys(n.fields).forEach(r=>{const i=`findBy${r.charAt(0).toUpperCase().concat(r.slice(1))}`;if("id"===r)return a[i]=d.bind(void 0,e,t,n);a[i]=(async(e,t,n,a,r,i={},d=!0)=>{const u=o.default.bind(void 0,t,n);let c={[a]:r};n.deleteField&&(c[n.deleteField]=!1);let{rows:f}=await u().where(c).run();return f&&f.length?d?Promise.all(f.map(async a=>(await s(e,t,n,a,i),await l(e,t,n,a,i),a))):f:[]}).bind(void 0,e,t,n,r)}),a})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(1),i=n(2),o=(a=i)&&a.__esModule?a:{default:a};t.default=(async(e,t,n)=>{const a=(0,r.deleteTable)(t).objValues(n),i=a.values,s=a.toSQL(),{rows:l}=await e.execute(s,i);if(l&&l.length)return l.map(o.default.bind(void 0,t)).shift()})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(3),i=(a=r)&&a.__esModule?a:{default:a};const o=(e,t)=>Object.keys(e).map(n=>{const a=e[n];if("$or"===n.toLowerCase())return`(${o(a,t).join(") OR (")})`;if("$and"===n.toLowerCase())return`(${o(a,t).join(") AND (")})`;if(Array.isArray(a)){let e=[];return a.forEach(a=>{if("object"==typeof a)return e=e.concat(o(a,t));e.push(s(n,a,t))}),`(${e.join(") OR (")})`}return s(n,a,t)}),s=(e,t,n)=>{const{comparator:a,value:r}=(0,i.default)(t);return null===r&&"="===a?`${e} is null`:(n.push(r),`${e} ${a} $${n.length}`)};t.default=(()=>{const e={tableName:"",fields:[],order:[],group:[],values:[],joins:[]};return e.from=((e,t)=>Object.assign(e,{tableName:t})).bind(void 0,e),e.join=((e,t)=>(e.joins.push(t),e)).bind(void 0,e),e.skip=((e,t)=>Object.assign(e,{skipRows:t})).bind(void 0,e),e.limit=((e,t)=>Object.assign(e,{limitRows:t})).bind(void 0,e),e.field=((e,t)=>(e.fields.push(t),e)).bind(void 0,e),e.toSQL=(({tableName:e,fields:t,order:n,group:a,conditions:r,limitRows:i,skipRows:o,joins:s})=>{const l=o?`\nOFFSET ${o}`:"",d=i?`\nLIMIT ${i}`:"",u=n&&n.length?`\nORDER BY ${n.join(", ")}`:"",c=a&&a.length?`\nGROUP BY ${a.join(", ")}`:"",f=r&&r.length?`\nWHERE (${r.join(")\n  AND (")})`:"",b=s&&s.length?`\n${s.join("\n")}`:"";return`\nSELECT ${t.join(", ")}\nFROM ${e}${b}${f}${c}${u}${d}${l}\n  `.trim()}).bind(void 0,e),e.where=((e,t)=>(t||(t={}),e.conditions||(e.conditions=[]),e.conditions=e.conditions.concat(o(t,e.values)),e)).bind(void 0,e),e.value=((e,t)=>(e.values||(e.values=[]),e.values.push(t),e)).bind(void 0,e),e.orderBy=((e,t,n)=>(n||(n=""),e.order.push(`${t} ${n.toUpperCase()}`.trim()),e)).bind(void 0,e),e.groupBy=((e,t)=>(e.group.push(t),e)).bind(void 0,e),e.setValues=((e,t)=>(t||(t=[]),e.values||(e.values=[]),e.values=t,e)).bind(void 0,e),e})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(3),i=(a=r)&&a.__esModule?a:{default:a};t.default=(e=>{const t={schema:e,values:[],conditions:[]};return t.toSQL=(e=>{const{schema:t,conditions:n}=e,{table:a,fields:r}=t;return`\nDELETE FROM ${a}${n&&n.length?`\nWHERE (${n.join(")\n  AND (")})`:""}\nRETURNING ${Object.keys(r).join(", ")};\n`.trim()}).bind(void 0,t),t.objValues=((e,t)=>(e.values=[],e.conditions=Object.keys(t||{}).map((n,a)=>{const{comparator:r,value:o}=(0,i.default)(t[n]);return e.values.push(o),`${n} ${r} $${a+1}`}),e)).bind(void 0,t),t})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,r=n(3),i=(a=r)&&a.__esModule?a:{default:a};t.default=(e=>{const t={schema:e,values:[],conditions:[]};return t.toSQL=(e=>{const{schema:t,paramters:n,conditions:a}=e,{table:r,fields:i}=t,o=a&&a.length?`\nWHERE (${a.join(")\n  AND (")})`:"";return`\nUPDATE ${r} SET\n  ${n.join(",\n  ")}${o}\nRETURNING ${Object.keys(i).join(", ")};\n`.trim()}).bind(void 0,t),t.objValues=((e,t,n)=>{const{schema:a}=e,{fields:r}=a,o=Object.keys(t).filter(e=>r.hasOwnProperty(e)&&void 0!==t[e]);return e.values=o.map(e=>t[e]),e.paramters=o.map((e,t)=>`${e} = $${t+1}`),e.conditions=Object.keys(n||{}).map((t,a)=>{const{comparator:r,value:s}=(0,i.default)(n[t]);return e.values.push(s),`${t} ${r} $${o.length+a+1}`}),e}).bind(void 0,t),t})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=(e=>{const t={schema:e,values:{}};return t.toSQL=(e=>{const{schema:t,listFields:n,paramters:a}=e,{table:r,fields:i}=t;return`\nINSERT INTO ${r} (${n.join(", ")})\nVALUES (${a.join(", ")})\nRETURNING ${Object.keys(i).join(", ")};\n`.trim()}).bind(void 0,t),t.objValues=((e,t)=>{const{schema:n}=e,{fields:a}=n;return e.listFields=Object.keys(t).filter(e=>a.hasOwnProperty(e)&&void 0!==t[e]),e.values=e.listFields.map(e=>t[e]),e.paramters=e.listFields.map((e,t)=>`$${t+1}`),e}).bind(void 0,t),t})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=(e=>{const t={tableName:e,columns:[],uniques:[],foreigns:[]},n={};return n.toSQL=(({tableName:e,columns:t,uniques:n,foreigns:a})=>`\nCREATE TABLE ${e} (\n  ${t.concat(n,a).join(",\n  ")}\n);\n`.trim()).bind(void 0,t),n.unique=((e,{tableName:t,uniques:n},a)=>(n.push(`CONSTRAINT unique_${t}_${a} UNIQUE (${a})`),e)).bind(void 0,n,t),n.column=((e,{columns:t},n,r,i,o)=>{let s="",l="";return i&&(s=" NOT NULL"),void 0!==o&&(l=["boolean","number",""].indexOf(typeof o)>-1?` DEFAULT ${String(o).toUpperCase()}`:` DEFAULT '${o}'`),t.push(`${n} ${r===a.REFERENCES?a.INTEGER:r}${s}${l}`),e}).bind(void 0,n,t),n.foreign=((e,{tableName:t,foreigns:n},a,r,i)=>(n.push(`CONSTRAINT foreign_${t}_${a} FOREIGN KEY (${a}) REFERENCES ${r} (${i||"id"})`),e)).bind(void 0,n,t),n})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=(e=>{const t={tableName:e,adds:[],drops:[],alters:[],indexs:[]},n={};return n.toSQL=(({tableName:e,adds:t,alters:n,drops:a,indexs:r})=>`\nALTER TABLE ${e}\n  ${t.concat(n,a,r).join(",\n  ")};\n`.trim()).bind(void 0,t),n.setType=((e,{alters:t},n,r)=>(t.push(`ALTER COLUMN ${n} TYPE ${r===a.REFERENCES?a.INTEGER:r}`),e)).bind(void 0,n,t),n.addColumn=((e,{adds:t},n,r,i,o)=>{let s="",l="";return i&&(s=" NOT NULL"),void 0!==o&&(l=["boolean","number",""].indexOf(typeof o)>-1?` DEFAULT ${String(o).toUpperCase()}`:` DEFAULT '${o}'`),t.push(`ADD COLUMN ${n} ${r===a.REFERENCES?a.INTEGER:r}${s}${l}`),e}).bind(void 0,n,t),n.addUnique=((e,{tableName:t,indexs:n},a)=>(n.push(`ADD CONSTRAINT unique_${t}_${a} UNIQUE (${a})`),e)).bind(void 0,n,t),n.dropUnique=((e,{tableName:t,indexs:n},a)=>(n.push(`DROP CONSTRAINT unique_${t}_${a}`),e)).bind(void 0,n,t),n.dropColumn=((e,{drops:t},n)=>(t.push(`DROP COLUMN ${n} RESTRICT`),e)).bind(void 0,n,t),n.setDefault=((e,{alters:t},n,a)=>{let r="";return void 0!==a&&(r=["boolean","number",""].indexOf(typeof a)>-1?`${String(a).toUpperCase()}`:`'${a}'`),t.push(`ALTER COLUMN ${n} SET DEFAULT ${r}`),e}).bind(void 0,n,t),n.setNotNull=((e,{alters:t},n)=>(t.push(`ALTER COLUMN ${n} SET NOT NULL`),e)).bind(void 0,n,t),n.dropNotNull=((e,{alters:t},n)=>(t.push(`ALTER COLUMN ${n} DROP NOT NULL`),e)).bind(void 0,n,t),n.dropDefault=((e,{alters:t},n)=>(t.push(`ALTER COLUMN ${n} DROP DEFAULT`),e)).bind(void 0,n,t),n.renameColumn=((e,{alters:t},n,a)=>(t.push(`RENAME COLUMN ${n} TO ${a}`),e)).bind(void 0,n,t),n.addForeign=((e,{tableName:t,indexs:n},a,r,i)=>(n.push(`ADD CONSTRAINT foreign_${t}_${a} FOREIGN KEY (${a}) REFERENCES ${r} (${i||"id"})`),e)).bind(void 0,n,t),n.dropForeign=((e,{tableName:t,indexs:n},a)=>(n.push(`DROP CONSTRAINT foreign_${t}_${a}`),e)).bind(void 0,n,t),n})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=(e=>{const t={};return t.toSQL=(e=>`\nDROP TABLE ${e};\n`.trim()).bind(void 0,e),t})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(4)),r=s(n(8)),i=s(n(7)),o=n(6);function s(e){return e&&e.__esModule?e:{default:e}}const l=(e,t,n)=>{const s=JSON.parse(JSON.stringify(e[n]));e[n].hasOwnProperty("afterSave")&&(s.afterSave=e[n].afterSave),e[n].hasOwnProperty("beforeSave")&&(s.beforeSave=e[n].beforeSave);const d=l.bind(void 0,e,t),u={schema:s};return u.select=a.default.bind(void 0,t,s),u.delete=r.default.bind(void 0,t,s),u.insert=o.insertData.bind(void 0,d,e,t,s),u.update=o.updateData.bind(void 0,d,e,t,s),Object.assign(u,(0,i.default)(e,t,s))};t.default=(e=>{const t={};return e.forEach(e=>Object.assign(t,{[e.table]:e})),((e,t)=>l.bind(void 0,e,t)).bind(void 0,t)})},function(e,t){e.exports=require("pg")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.genSQL=t.types=void 0;var a=l(n(17)),r=l(n(16)),i=l(n(5)),o=l(n(0)),s=l(n(1));function l(e){return e&&e.__esModule?e:{default:e}}t.types=o.default,t.genSQL=s.default;t.default=(e=>{const t=new a.default.Pool(e);return{connect:i.default.bind(void 0,t,e),orm:r.default,pool:t}})}]);
//# sourceMappingURL=q-postgres.js.map