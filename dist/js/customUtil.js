"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopyObject = exports.copyObjectViaJSON = exports.deepFreeze = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var deepFreeze = function deepFreeze(object) {
  var propertyNames = Object.getOwnPropertyNames(object);

  var _iterator = _createForOfIteratorHelper(propertyNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var propertyName = _step.value;
      var value = object[propertyName];

      if (value && _typeof(value) === "object") {
        deepFreeze(value);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Object.freeze(object);
};

exports.deepFreeze = deepFreeze;

var copyObjectViaJSON = function copyObjectViaJSON(target) {
  // JSON을 활용한 깊은 복사, 하지만 내부 함수를 undefiend 처리한다.
  return JSON.parse(JSON.stringify(target));
};

exports.copyObjectViaJSON = copyObjectViaJSON;

var deepCopyObject = function deepCopyObject(target) {
  console.log(target);
  var result = {};

  if (_typeof(target) !== "object" || target === null) {
    return target;
  }

  for (var property in target) {
    result[property] = deepCopyObject(target[property]);
  }

  return result;
};

exports.deepCopyObject = deepCopyObject;