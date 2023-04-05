Array.prototype._reduce = function (fn, initVal) {
  // 判断数组是否为空
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  const initValue = initVal || this[0];
  const firstIndex = initVal ? 0 : 1;
  let res = initValue;
  for (let i = firstIndex; i < this.length; i++) {
    res = fn(res, this[i], i, this);
  }
  return res;
};
Array.prototype._map = function (fn, thisVal) {
  return this.reduce((pre, cur, index, arr) => {
    return [...pre, fn.call(thisVal, cur, index, arr)];
  }, []);
};
Function.prototype._call = function (context, ...args) {
  if (typeof this !== "function") {
    TypeError("调用必须为函数");
  }
  const _this = context || window || globalThis;
  _this.fn = this;
  const res = _this.fn(...args);
  delete _this.fn;
  return res;
};
Function.prototype._apply = function (context, args) {
  if (typeof this !== "function") {
    TypeError("调用必须为函数");
  }
  const _this = context || window || globalThis;
  _this.fn = this;
  const res = _this.fn(...args);
  delete _this.fn;
  return res;
};
Function.prototype._bind = function (context, ...args) {
  if (typeof this !== "function") {
    TypeError("调用必须为函数");
  }
  const self = this;
  const cacheFn = function () {};
  cacheFn.prototype = this.prototype;
  const resFn = function () {
    return self.apply(this instanceof cacheFn ? this : context, [...args, ...arguments]);
  };
  resFn.prototype = new cacheFn();
  return resFn;
};

function myNew(Fn, ...args) {
  const obj = {};
  obj.__proto__ = Fn.prototype;
  const res = Fn.apply(obj, args);
  return typeof res === "object" ? res : obj;
}

function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null) return false;
  const proto = Object.getPrototypeOf(left);
  while (1) {
    if (proto === null) return false;
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

function myCloneDeep(obj, map = new Map()) {
  if (typeof obj !== "object" || obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  if (map.get(obj)) return map.get(obj);
  let cloneObj = new obj.constructor();
  map.set(obj, cloneObj);

  for (let key in obj) {
    cloneObj[key] = myCloneDeep(obj[key]);
  }
  return cloneObj;
}
