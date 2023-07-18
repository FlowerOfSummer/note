// Welcome to Cursor

// 1. Try generating with command K on a new line. Ask for a new react component of an error popup.
// 2. Then, select the outputted code and hit chat. Ask if there's a bug. Ask how to improve.
// 3. Try selecting some code and hitting edit. Ask the bot to add a button that updates a statefield.
// 4. To try out cursor on your own projects, go to file menu (top left) and open a folder.
// Sorry, as an AI language model, I cannot provide a complete implementation of Vue3. However, I can provide some guidance on how to get started.

// instanceof原理实现
function myInstanceof(left, right) {
  // 基本数据类型直接返回false
  if (typeof left !== "object" || left === null) return false;
  // getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left);
  while (true) {
    // 查找到尽头，还没找到
    if (proto == null) return false;
    // 找到相同的原型对象
    if (proto == right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
// new 实现
function myNew() {
  // 创建一个空对象
  let obj = {};
  // 取到外部传入的构造器
  let Constructor = Array.prototype.shift.call(arguments);
  // 实现继承，要实例可以访问构造器的属性
  obj.__proto__ = Constructor.prototype;
  // 调用构造器，并改变其this指向到新创建的对象
  let ret = Constructor.apply(obj, arguments);
  // 如果构造器没有手动返回对象，则返回第一步创建的对象
  return typeof ret === "object" ? ret : obj;
}

// 实现reduce方法
Array.prototype.myReduce = function (callback, initialValue) {
  // 判断数组是否为空
  if (this.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }
  // 判断是否有初始值
  let hasInitialValue = initialValue !== undefined;
  // 定义累加器
  let accumulator = hasInitialValue ? initialValue : this[0];
  // 定义起始索引
  let startIndex = hasInitialValue ? 0 : 1;
  // 循环遍历数组
  for (let i = startIndex; i < this.length; i++) {
    // 调用回调函数，更新累加器的值
    accumulator = callback(accumulator, this[i], i, this);
  }
  // 返回累加器的值
  return accumulator;
};

/**
 * 实现 call 方法
 * @returns {any} 函数执行结果
 */
function myCall() {
  // 判断调用 call 方法的是否为函数
  if (typeof this !== "function") {
    throw TypeError("not function");
  }
  // 获取传入的参数
  let [_this, ...args] = [...arguments];
  // 如果传入的第一个参数为 null 或 undefined，则指向全局对象
  if (!_this) {
    _this = typeof window === "undefined" ? global : window;
  }
  // 将函数作为传入的第一个参数的属性
  _this.fn = this;
  // 执行函数并获取返回值
  let res = _this.fn(...args);
  // 删除函数属性
  delete _this.fn;
  // 返回函数执行结果
  return res;
}

/**
 * 实现 call 方法
 * @returns {any} 函数执行结果
 */
function myCall() {
  // 判断调用 call 方法的是否为函数
  if (typeof this !== "function") {
    throw TypeError("not function");
  }
  // 获取传入的参数
  let [_this, ...args] = [...arguments];
  // 如果传入的第一个参数为 null 或 undefined，则指向全局对象
  if (!_this) {
    _this = typeof window === "undefined" ? global : window;
  }
  // 将函数作为传入的第一个参数的属性
  _this.fn = this;
  // 执行函数并获取返回值
  let res = _this.fn(...args);
  // 删除函数属性
  delete _this.fn;
  // 返回函数执行结果
  return res;
}

/**
 * 实现 apply 方法
 * @returns {any} 函数执行结果
 */
function myApply() {
  // 判断调用 apply 方法的是否为函数
  if (typeof this !== "function") {
    throw TypeError("not function");
  }
  // 获取传入的参数
  let [_this, args] = [...arguments];
  // 如果传入的第一个参数为 null 或 undefined，则指向全局对象
  if (!_this) {
    _this = typeof window === "undefined" ? global : window;
  }
  // 将函数作为传入的第一个参数的属性
  _this.fn = this;
  // 执行函数并获取返回值
  let res = _this.fn(...args);
  // 删除函数属性
  delete _this.fn;
  // 返回函数执行结果
  return res;
}

/**
 * 实现 bind 方法
 * @returns {Function} 绑定 this 后的函数
 */
function myBind() {
  // 判断调用 bind 方法的是否为函数
  if (typeof this !== "function") {
    throw TypeError("not function");
  }
  // 获取传入的参数
  let [_this, ...args] = [...arguments];
  // 保存当前函数
  let fn = this;
  // 返回一个新函数
  return function () {
    // 获取新函数调用时的参数
    let newArgs = [...arguments];
    // 将原函数的 this 绑定到传入的第一个参数上
    return fn.apply(_this, args.concat(newArgs));
  };
}
/**
 * 多个请求并发控制
 * @param {Array} urls 请求地址数组
 * @param {Number} maxNum 最大并发数
 * @returns {Promise} Promise 对象
 */
// 实现一个多个请求并发控制的函数
function multiRequest(urls, maxNum) {
  const len = urls.length; // 获取请求地址数组的长度
  const result = new Array(len).fill(false); // 创建一个长度为 len 的数组，用于存储请求结果
  let count = 0; // 计数器，用于记录已经完成的请求数量
  return new Promise((resolve, reject) => {
    // 返回一个 Promise 对象
    while (count < maxNum) {
      // 当已完成的请求数量小于最大并发数时，继续发起请求
      next(); // 发起请求
    }
    function next() {
      // 发起请求的函数
      let current = count++; // 获取当前请求的索引，并将计数器加 1
      if (current >= len) {
        // 如果当前请求的索引大于等于请求地址数组的长度
        !result.includes(false) && resolve(result); // 如果 result 数组中不包含 false，则说明所有请求都已完成，此时将 Promise 对象的状态设置为已完成
        return; // 结束函数的执行
      }
      const url = urls[current]; // 获取当前请求的地址
      fetch(url) // 发起请求
        .then((res) => {
          result[current] = res; // 将请求结果存储到 result 数组中
          if (current < len) {
            // 如果当前请求的索引小于请求地址数组的长度
            next(); // 继续发起请求
          }
        })
        .catch((err) => {
          result[current] = err; // 将请求错误信息存储到 result 数组中
          if (current < len) {
            // 如果当前请求的索引小于请求地址数组的长度
            next(); // 继续发起请求
          }
        });
    }
  });
}

// 找出出现次数最少的字符，并删除，不影响原字符串顺序
function removeLeastFrequent(str) {
  const freq = {}; // 创建一个空对象，用于存储每个字符出现的次数
  for (const char of str) {
    // 遍历字符串中的每个字符
    freq[char] = (freq[char] || 0) + 1; // 将当前字符的出现次数加 1
  }
  const minFreq = Math.min(...Object.values(freq)); // 获取字符出现次数的最小值
  let result = ""; // 创建一个空字符串，用于存储结果
  for (const char of str) {
    // 遍历字符串中的每个字符
    if (freq[char] !== minFreq) {
      // 如果当前字符的出现次数不是最小值
      result += char; // 将当前字符添加到结果字符串中
    }
  }
  return result; // 返回结果字符串
}
// https://juejin.cn/post/7142690757722243102
// 请求重联
function fetchWithRetry(url, options = {}, retries = 3) {
  return fetch(url, options) // 发起请求
    .then((res) => {
      if (res.ok) {
        // 如果请求成功
        return res; // 返回响应结果
      } else {
        // 如果请求失败
        throw new Error(`${res.status} ${res.statusText}`); // 抛出错误
      }
    })
    .catch((error) => {
      // 捕获错误
      if (retries > 0) {
        // 如果还有重试次数
        return fetchWithRetry(url, options, retries - 1); // 递归调用 fetchWithRetry 函数
      } else {
        // 如果没有重试次数了
        throw error; // 抛出错误
      }
    });
}
