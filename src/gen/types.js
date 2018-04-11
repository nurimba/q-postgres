export const TEXT = 'TEXT'
export const NAME = 'VARCHAR(255)'
export const DATE = 'DATE'
export const JSON = 'JSON'
export const ARRAY = 'JSONB'
export const CHAR1 = 'CHAR(1)'
export const CHAR2 = 'CHAR(2)'
export const CHAR8 = 'CHAR(8)'
export const EMAIL = 'VARCHAR(50)'
export const PHONE = 'VARCHAR(30)'
export const MONEY = 'NUMERIC(15,2)'
export const STRING = 'VARCHAR(255)'
export const CITEXT = 'CITEXT'
export const SELECT = 'VARCHAR(25)'
export const BOOLEAN = 'BOOLEAN'
export const INTEGER = 'INTEGER'
export const SMALLINT = 'SMALLINT'
export const CPFCNPJ = 'VARCHAR(14)'
export const PERCENT = 'NUMERIC(15,8)'
export const PRIMARY = 'SERIAL PRIMARY KEY'
export const DATETIME = 'TIMESTAMP'
export const REFERENCES = 'REFERENCES'
export const NOT_NULL = 'NOT NULL'

const INTs = [INTEGER, SMALLINT, PRIMARY]

export const isArray = (field) =>
  typeof (field) === 'object'
    ? ARRAY === field.type
    : ARRAY === field

export const isBoolean = (field) =>
  typeof (field) === 'object'
    ? BOOLEAN === field.type
    : BOOLEAN === field

export const isMoney = (field) =>
  typeof (field) === 'object'
    ? MONEY === field.type
    : MONEY === field

export const isPercent = (field) =>
  typeof (field) === 'object'
    ? PERCENT === field.type
    : PERCENT === field

export const isInt = (field) =>
  typeof (field) === 'object'
    ? INTs.indexOf(field.type) > -1
    : INTs.indexOf(field) > -1

export default {
  TEXT,
  DATE,
  NAME,
  JSON,
  ARRAY,
  CHAR1,
  CHAR2,
  CHAR8,
  EMAIL,
  PHONE,
  MONEY,
  STRING,
  SELECT,
  CITEXT,
  BOOLEAN,
  INTEGER,
  CPFCNPJ,
  PERCENT,
  PRIMARY,
  DATETIME,
  SMALLINT,
  NOT_NULL,
  REFERENCES
}
