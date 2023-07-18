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
    // 检查this是否为函数
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
    }
    // 将第一个参数赋值给_this，其余参数赋值给args
    let [_this, ...args] = arguments;
    
    // 保存this
    let self = this;
    
    // 定义一个空函数
    var cacheFn = function() {};
    // 定义一个新函数
    let fn = function () {
      // 将args和arguments合并为一个新数组
      let newArgs = [...args, ...arguments]
      // 判断this是否为cacheFn的实例，如果是则返回this，否则返回_this
      return self.apply(this instanceof cacheFn ? this : _this, newArgs)
    }
    
    // 将cacheFn的原型设置为self的原型
    cacheFn.prototype = self.prototype;
    // 将fn的原型设置为cacheFn的实例
    fn.prototype = new cacheFn();
    // 返回新函数
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
// 实现call方法
Function.prototype.call = function(context, ...args) {
  // 检查this是否为函数
  if (typeof this !== "function") {
    throw new Error("Function.prototype.call - what is trying to be called is not callable")
  }
  // 将函数作为传入的对象的方法调用
  context.fn = this;
  // 执行函数
  let result = context.fn(...args);
  // 删除函数
  delete context.fn;
  // 返回函数执行结果
  return result;
}

// 实现apply方法
Function.prototype.apply = function(context, args) {
  // 检查this是否为函数
  if (typeof this !== "function") {
    throw new Error("Function.prototype.apply - what is trying to be called is not callable")
  }
  // 将函数作为传入的对象的方法调用
  context.fn = this;
  // 执行函数
  let result = context.fn(...args);
  // 删除函数
  delete context.fn;
  // 返回函数执行结果
  return result;
}
Function.prototype.call = function () {
  let [_this, ...args] = arguments;
  _this = _this || window;
  _this.fn = this;
  let result = args ? _this.fn(...args) : _this.fn()
  delete _this.fn;
  return result;
}

Function.prototype.apply = function () {
  let [_this, ...args] = arguments;
  _this = _this || window;
  _this.fn = this;
  let result = args ? _this.fn(args) : _this.fn()
  delete _this.fn
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
  fn.prototype = new cacheFn();
  return fn;
}


function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.call(obj, ...args);
  return res instanceof Object ? res : obj;
}

```

```js
Function.prototype.myBind() {
  if (typeof this !== 'function') {
    throw Error('Error');
  }
  const self = this;
  const [_this, ...args] = arguments;

  let fn = {};
  fn.prototype = self.prototype;
  let resFn = function () {
    let newArgs = [...args, arguments];
    return self.apply(this instanceof fn ? this : _this, args);
  }
  resFn = new fn();
  return resFn;
} 

```


```js

function myNew(Fun) {
  let obj = {};
  obj.__proto__ = Fun.prototype;
  let res = Fun.apply(obj, arguments);

  return res instanceof Object ? res : obj;
}
```
