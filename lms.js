var lms = (function () {
  // setup vars
  var lm, q = {}, isTag, parseTag, parseAttrs, parseAttrObj, re;
  // root function
  lm = function (arr) {
    var rtn = [], l, i;
    if (isTag(arr)) {
      rtn = rtn.concat(parseTag(arr));
    } else {
      if (q.isA(arr) && !q.isEA(arr)) {
        l = arr.length;
        for (i = 0; i < l; i += 1) {
          if (q.isA(arr[i]) && isTag(arr[i])) {
            rtn = rtn.concat(parseTag(arr[i]));
          }
        }
      }
    }
    return rtn.join('');
  };
  // private
  re = new RegExp("^[a-zA-Z]((?![ ]).)*$");// match valid tag name
  parseTag = function (arr) {
    var i, rtn = [], children = [], attrs = [],
      name = q.h(arr), tail = q.t(arr),
      l = tail.length;
    // loop and concat all strings and tags,
    // but collect attributes into one object
    rtn = ['<', name];
    for (i = 0; i < l; i += 1) {
      if (q.isS(tail[i])) {
        children.push(tail[i]);
      } else if (isTag(tail[i])) {
        children.push(parseTag(tail[i]).join(''));
      } else if (q.isA(tail[i])) {
        children.push(lm(tail[i]));
      } else if (q.isO(tail[i])) {
        attrs.push(parseAttrs(tail[i]));
      }
    }
    if (attrs.length > 0) {
      rtn.push(attrs.join(''));
    }
    rtn.push('>', children.join(''), '</', name, '>');
    return rtn;
  };
  parseAttrs = function (o) {
    var k, str = [];
    for (k in o) {
      if (o.hasOwnProperty(k)) {
        if (q.isS(o[k])) {
          str.push(' ', k, '="', o[k], '"');
        } else if (q.isO(o[k])) {
          str.push(' ', k, '="', parseAttrObj(o[k]), '"');
        }
      }
    }
    return str.join('');
  };
  parseAttrObj = function (attr) {
    var rtn = [], k;
    for (k in attr) {
      if (attr.hasOwnProperty(k)) {
        rtn.push(k + ': ' + attr[k] + ';');
      }
    }
    return rtn.join(' ');
  };
  isTag = function (arr) {
    // validate tag array
    return q.isA(arr) && q.isS(arr[0]) && re.test(arr[0]);
  };
  q.toS = function (x) {
    // shortcut q.toString
    return Object.prototype.toString.call(x);
  };
  q.isU = function (u) {
    // return true id u q.is undefined
    return typeof (u) === "undefined";
  };
  q.isO = function (o) {
    // q.is "o" an Object?
    return q.isU(o) === false && q.toS(o) === "[object Object]" &&
      typeof (o.length) !== 'number' && typeof (o.splice) !== 'function';
  };
  q.isA = function (a) {
    // q.is "a" an Array?
    return q.isU(a) ?
      false :
      typeof (a.length) === 'number' &&
      !(a.propertyIsEnumerable('length')) &&
      typeof (a.splice) === 'function';

  };
  q.isEA = function (a) {
    // q.is a an empty list?
    return q.isA(a) && a.length === 0;
  };
  q.h = function (a) {
    // return the head of a list
    if (q.isA(a)) {
      return a[0];
    }
  };
  q.t = function (a) {
    // return the tail of a list
    if (q.isA(a)) {
      return a.slice(1, a.length);
    }
  };
  q.isS = function (s) {
    // q.is s a string?
    return q.isU(s) === false && q.toS(s) === "[object String]";
  };
  return lm;
}());
