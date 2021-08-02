### call/apply/bind作用及异同

#### 作用

* 改变对象执行时上下文，即改变对象的this指向。

```js
var name="lucy";
const obj={
    name:"martin",
    say:function () {
        console.log(this.name);
    }
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say,0); //lucy，this指向window对象
```

#### 异同

* apply
  * 接受两个参数，一个是this，一个是函数参数，以数组的形式传入。
  * 会立即执行，临时改变this指向，只会修改一次。
  * 当第一个参数是null,和undefined时，this默认指向window

  ```js
    function fn(...args){
        console.log(this,args);
    }
    var obj = {
        myname:"张三"
    }

    fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
    fn(1,2) // this指向window

  ```

* call
  * 接受多个参数，一个是this，剩余的是函数的参数，以参数列表的形式（与apply唯一的不同）
  * 会立即执行，临时改变this指向，只会修改一次
  * 当第一个参数是null,和undefined时，this默认指向window

* bind
  * 接受多个参数，与call一样，第一个是this指向，后面的是函数的参数列表
  * 不会立即执行，而是返回一个永久改变this指向的函数，可以通过该函数传参,多次传参
  * 当第一个参数是null,和undefined时，this默认指向window

  ```js
    // 方式一：只在bind中传递函数参数
    fn.bind(obj,1,2)()

    // 方式二：在bind中传递函数参数，也在返回函数中传递参数
    fn.bind(obj,1)(2)
  ```

##### apply/call/bind的实现

* bind
  * 修改this指向
  * 实现动态传参
  * 兼容new关键字

  ```js
  Function.prototype.bind = function () {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }
    let [_this, ...args] = arguments;
    
    let self = this;
    var cacheFn = function() {};
    cacheFn.prototype = self.prototype;
    let fn = function () {
      let newArgs = [...args, ...arguments]
      return self.apply(this instanceof cacheFn ? this : _this, newArgs)
    }
    fn.prototype = new cacheFn();
    return fn;
  }
  ```

* apply
  * 修改this指向
  * 立即执行

  ```js
    Function.prototype.apply = function () {
      let [_this, args] = arguments;
      if (!_this) {
        _this = typeof window === 'undefined' ? global : window
      }
      _this.fn = this;
      if (!args) {
        const result = _this.fn();
      } else {
        const result = _this.fn(...args);
      }
      delete _this.fn;
      return result;
    }
  ```

* call
  * 修改this指向
  * 立即执行

  ```js
    Function.prototype.call = function () {
      let [_this, ...args] = arguments;
      if (!_this) {
        _this = typeof window === 'undefined' ? global : window
      }
      _this.fn = this;
      const result = _this.fn(...args);
      delete _this.fn
      return result
    }
  ```



```js
Function.prototype.call = function () {
  let [_this, ...args] = arguments;
  _this = _this || window;
  _this.fn = this;
  let result = args ? _this.fn(...args) : _this.fn()
  return result;
}

Function.prototype.apply = function () {
  let [_this, args] = arguments;
  _this = _this || window;
  _this.fn = this;
  let result = args ? _this.fn(...args) : _this.fn()
  return result;
}

Function.protopyte.bind = function () {
  let [_this, ...args] = arguments;
  let self = this;
  let cacheFn = function () {};
  cacheFn.prototype = this.prototype;

  let fn = function () {
    return self.apply(this instanceof cacheFn ? this : _this, [...args, ...arguments])
  }
  fn = new cacheFn();
  return fn;
}


function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.call(obj, args);
  return res instanceof Object ? res : obj;
}

Promise.all = function (promises) {
  return new Promise(function () {
    let result = []
    promises.forEach(proomise => {
      promise.then(data => {
        result.push(data);
      })
    })
    return result;
  })
}
```

```js
// 实现reduce方法
Array.prototype.myReduce(fn, initValue) {
  if(initValue === undefined && !this.length) {
    throw Error('myReduce of empty array with no initial value');
  }
  let result = initValue ? initValue : this[0];
  for(let i=initValue ? 0:1;i<this.length;i++) {
    result = fn(result, this[i], i, this);
  }
}

// 使用reduce方法实现map
Array.prototype.myMap(fn, thisValue) {
  return this.reduce((total, value, index, arr) => {
    total = [...total, fn.call(thisValue, value, index, arr)]
  }, [])
}
```

```js
function repeat(func, times, wait) {
    //实现这个函数
  return function(str) {
    let count = 0;
    let id = setInterval(() => {
      if(++count === times) {
        clearInterval(id);
      }
      func(str)
    }, wait)
  }
}
// 使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc("hellworld"); //会输出4次 helloworld, 每次间隔3秒

repeatFunc("hellworld2");

```

```js
// 函数柯里化

function curry(fn, curArgs) {
  return function () {
    let args = [...arguments];
    if(curArgs !== undefined) {
      args = [...args, ...curArgs];
    }
    if(args.length < fn.length) {
      return curry(fn, args);
    }
    return fn.apply(null, args);
  }
}
```