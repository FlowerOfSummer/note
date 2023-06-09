### new 操作符做了什么

#### new 操作符是什么

* 定义：创造一个给定构造函数的实例对象
* 特性：
  * new 出来的实例对象可以访问构造函数的属性和方法
  * new 出来的实例对象可以访问构造函数原型上的属性和方法

#### 手撕代码：new操作符实现

* 流程
  * 创建一个新的对象obj
  * 将对象和构造函数通过原型链连接
  * 将构造函数的this绑定到新的obj
  * 根据构造函数返回数据类型判断，是原始值就返回创建的obj,否则返回

```js
/**
 * 实例.__proto__ === 原型
 * 原型.constructor === 构造函数
 * 构造函数.prototype === 原型
 **/
  function mynew(Fun, ...args) {
    let obj = {};
    obj.__proto__ = Fun.prototype;
    let res = Fun.apply(obj, args)
    return res instanceof Object ? res : obj
  }

```
