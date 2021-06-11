## Vue3设计目标

#### 更小

* 移除一些不必要的API，
* 引入tree-sharking，可以将无用模块剪辑，只打包有用的模块

#### 更快


#### 更友好

* typeScript支持
* API的一致性
* 提高自身可维护性
* 开放更多底层功能

#### 优化方案

* diff算法优化
  相比vue2，新增了静态标记。将静态元素加上-1，表示永远不会执行diff算法
* 静态提升
  将静态元素提升到render函数之外，只被创建一次，之后直接用已创建的元素渲染，减少了运行时的内存
* 事件监听缓存
  绑定事件的元素默认会认为是一个动态元素，当我们使用事件监听缓存的时候，创建元素会将事件存入缓存，然后将元素设置静态标记，也就意味着diff算法将不再执行
* SSR 优化
  tree-sharking：只打包需要的模块，没有用到的模块就干掉

## Vue3中proxy为什么替代defineProperty

* Object.defineProperty: 该方法是可以劫持一个对象，修改或新增一个属性，并返回一个该对象。
  * 监听不到对象属性的新增和删除
  * 监听不到数组api
  * 对深层次的对象监听需深度遍历，性能消耗大

* proxy: 它的监听是针对一个对象的，关于对象的所有操作我们都能监听到。这就完全可以代理所有属性了

  ```js
    function reactive(obj) {
      if (typeof obj !== 'object' || typeof obj !== null) {
        return obj;
      }
      const observe = new Proxy(obj, {
        get(target, key, receiver) {
          const res = Reflect.get(target, key, recevier);
          console.log(`get:${key}: ${res}`)
          return isObj(res) ? observe(res) : res;
        },
        set(target, key, receiver) {
          const res = Reflect.set(target, key, receiver);
          console.log(`set:${key}: ${res}`)
          return res;
        },
        deleteProperty(target, key) {
          const res = Reflect.deleteProprety(target, key);
          console.log(`delete:${key}: ${res}`)
          return res;
        }
      });
      return observe
    }
  ```
  
  * 监听整个对象，对属性的操作就都能监听到。
  * 对于数组的方法也同样能监听到，就无需再重写数组方法了。

## vue3中的tree-sharking

* tree-sharking: 是一种通过清除多余代码来优化打包体积的技术。
  在vue3中主要是在按需引入，按需打包，没有用到的就不会被打包。