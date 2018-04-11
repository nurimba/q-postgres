import {isInt, isArray, isMoney, isBoolean, isPercent} from './types'

export const prepareReturning = (fields) =>
  Object.keys(fields).map((field) => {
    const forceArray = isArray(fields[field])
    if (forceArray) return `${field}::JSONB`

    const forceInt = isInt(fields[field])
    if (forceInt) return `${field}::INT`

    const forceMoney = isMoney(fields[field])
    if (forceMoney) return `${field}::NUMERIC(15,2)`

    const forcePercent = isPercent(fields[field])
    if (forcePercent) return `${field}::NUMERIC(15,8)`

    const forceBoolean = isBoolean(fields[field])
    if (forceBoolean) return `${field}::BOOLEAN`

    return field
  }).join(',')
