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

## React和Vue是两个流行的前端框架，它们在使用上有一些区别：

1. 语法和模板：
- React使用JSX（JavaScript XML）作为组件的模板语法，将HTML和JavaScript代码混合在一起编写组件。
- Vue使用基于HTML的模板语法，将HTML和JavaScript代码分离，通过指令和插值表达式来操作DOM和数据。

2. 组件化开发：
- React将应用程序拆分为多个组件，每个组件都有自己的状态和生命周期方法，通过props和state进行数据传递和管理。
- Vue也采用组件化开发的方式，但它提供了更直接的选项来定义组件的数据和方法，如data、computed和methods。

3. 状态管理：
- React使用单向数据流的概念，通过props从父组件向子组件传递数据，通过回调函数将子组件的状态更新传递给父组件。
- Vue提供了一个名为Vuex的状态管理库，用于集中管理应用程序的状态，并通过在组件中使用getter和mutation来更新状态。

4. 生态系统和社区支持：
- React拥有庞大的生态系统和活跃的社区，有许多第三方库和工具可供选择，如React Router、Redux、Next.js等。
- Vue也有一个活跃的社区，并且有许多第三方库和工具可供选择，如Vue Router、Vuex、Nuxt.js等。

5. 学习曲线和上手难度：
- React的学习曲线相对较陡峭，因为它更加灵活和底层，需要掌握JSX、组件生命周期和状态管理等概念。
- Vue的学习曲线相对较平缓，因为它提供了更简单和直观的API，更容易上手和理解。

总的来说，React和Vue都是优秀的前端框架，选择哪个框架取决于个人偏好、项目需求和团队技术栈。如果你更喜欢灵活和底层的框架，并且对JavaScript有较深的理解，那么React可能更适合你。如果你更喜欢简单和直观的框架，并且对HTML和CSS有较深的理解，那么Vue可能更适合你。无论选择哪个框架，都需要深入学习和实践，以便能够熟练地使用它们来构建高质量的前端应用程序。