
/**
 * Array.remove(someItem) ... removes all values that equal someItem.
 * Array.remove(item => item.age < 18) ... removes all values whose matches the predicate.
 * @param valueOrPredicate
 * @returns {Array} removed items
 */
Array.prototype.remove = function(valueOrPredicate) {
  let removeValues = [];
  let predicate = typeof valueOrPredicate == "function"
      ? valueOrPredicate
      : value => value === valueOrPredicate;
  for (let i = 0; i < this.length; i++) {
    let value = this[i];
    if (predicate(value)) {
      removeValues.push(value);
      this.splice(i, 1);
      i--;
    }
  }
  return removeValues;
};

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
    let O = Object(this);
    let len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    let n = parseInt(arguments[1]) || 0;
    let k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    let currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}

if (!Array.prototype.hasOwnProperty('flatten')) {
  Array.prototype.flatten = function() {
    return Array.prototype.concat.apply([], this);
  };
}

if (!Array.prototype.hasOwnProperty('pushRange')) {
  Array.prototype.pushRange = function(array) {
    Array.prototype.push.apply(this, array);
  }
}

if (!String.prototype.hasOwnProperty('contains')) {
  String.prototype.contains = function(targetStr, searchStartIndex) {
    return -1 !== String.prototype.indexOf.call(this, targetStr, searchStartIndex);
  };
}

if (!String.prototype.hasOwnProperty('containsAny')) {
  String.prototype.containsAny = function(keywords, searchStartIndex) {
    for (let w of keywords) {
      if (this.contains(w, searchStartIndex)) return true;
    }
    return false;
  }
}

if (!String.prototype.hasOwnProperty('containsAll')) {
  String.prototype.containsAll = function(keywords, searchStartIndex) {
    for (let w of keywords) {
      if (!this.contains(w, searchStartIndex)) return false;
    }
    return true;
  }
}

if (!String.prototype.hasOwnProperty('containsCount')) {
  String.prototype.containsCount = function(keywords, searchStartIndex) {
    let count = 0;
    for (let w of keywords) {
      if (this.contains(w, searchStartIndex)) count++;
    }
    return count;
  }
}

if (!String.prototype.hasOwnProperty('trim')) {
  String.prototype.trim = function() {
    return String.prototype.replace.call(this, /(^\s+)|(\s+$)/g, "");
  }
}

if (!String.prototype.hasOwnProperty('startsWith')) {
  String.prototype.startsWith = function(str) {
    return this.lastIndexOf(str, 0) === 0;
  }
}

if (!String.prototype.hasOwnProperty('endsWith')) {
  String.prototype.endsWith = function (str) {
    return this.indexOf(str, this.length - str.length) !== -1;
  }
}

if (!String.prototype.hasOwnProperty('padLeft')) {
  String.prototype.padLeft = function(char, length) {
    return (char+this.toString()).slice(-length);
  }
}

if (!String.prototype.hasOwnProperty('padRight')) {
  String.prototype.padRight = function(char, length) {
    let val = this.toString();
    for (; val.length < length; val+=char);
    return val;
  }
}

if (!String.prototype.hasOwnProperty('in')) {
  String.prototype.in = function(list) {
    for (let x of list) {
      if (x === this) return true;
    }
    return false;
  }
}

if (typeof Object.assign != 'function') {
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const output = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const source = arguments[index];
        if (source !== undefined && source !== null) {
          for (let nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  })();
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    const hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      let result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}