```js
// WeakMap和WeakSet是ES6新增的两个数据结构，它们的特点是弱引用，即当对象没有被引用时，它们会被自动回收，不会造成内存泄漏。

// WeakMap是一种键值对的集合，其中键是弱引用的，值可以是任意类型。WeakMap的键必须是对象，而且不能被枚举。WeakMap的主要用途是存储对象的私有数据，这样可以避免在对象上添加属性，从而避免属性名冲突。

// 创建一个WeakMap对象
const wm = new WeakMap();

// 创建一个对象作为键
const key = {};

// 设置键值对
wm.set(key, "value");

// 获取键值对
console.log(wm.get(key)); // "value"

// 删除键值对
wm.delete(key);

// WeakSet是一种集合，其中元素是弱引用的，必须是对象。WeakSet的主要用途是存储对象的集合，这样可以避免在对象上添加属性，从而避免属性名冲突。

// 创建一个WeakSet对象
const ws = new WeakSet();

// 创建一个对象
const obj = {};

// 添加对象到集合中
ws.add(obj);

// 判断对象是否在集合中
console.log(ws.has(obj)); // true

// 从集合中删除对象
ws.delete(obj);
```

