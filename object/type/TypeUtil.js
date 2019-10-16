const { toString } = Object.prototype;

const isKindOf = (obj, target = 'Undefined') =>
  toString.call(obj) === `[object ${target}]`;

/**
 * 基础类型判断
 */

const isUndefined = (obj) => isKindOf(obj, 'Undefined');
const isNull = (obj) => isKindOf(obj, 'Null');

const isBoolean = (obj) => isKindOf(obj, 'Boolean');

/**
 * 判断目标是否为数字
 * 1. NaN 经过toString处理后的结果是[object Number], 需要排除
 * 2. isNaN方法有bug, eslint-airbnb-base建议使用Number.isNaN
 * 3. Number.isNaN判断目标是否为NaN, 取反结果不能判断目标是数字(Null/Undefined/String等都不是NaN)
 * @param {*} obj
 */
const isNumber = (obj) => isKindOf(obj, 'Number') && !Number.isNaN(obj);

const isString = (obj) => isKindOf(obj, 'String');
const isObject = (obj) => isKindOf(obj, 'Object');
const isSymbol = (obj) => isKindOf(obj, 'Symbol');

/**
 * 引用类型判断
 */

const isArray = (obj) => Array.isArray(obj);
const isDate = (obj) => isKindOf(obj, 'Date');
const isRegExp = (obj) => isKindOf(obj, 'RegExp');
const isFunction = (obj) => isKindOf(obj, 'Function');

export {
  isUndefined,
  isNull,
  isBoolean,
  isNumber,
  isString,
  isObject,
  isSymbol,
  isArray,
  isDate,
  isRegExp,
  isFunction,
};
