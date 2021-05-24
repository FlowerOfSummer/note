
* 不建议同一节点使用v-if和v-for。若同时使用v-if的优先级较高，所以v-if是访问不了v-for中的变量的。解决：可以移入<template>模板

    ```js
    // 不可取
    <li v-for="todo in todos" v-if="!todo.isComplete">
        {{ todo }}
    </li>
    // 替代方法
    <template v-for="todo in todos">
        <li v-if="!todo.isComplete">
            {{ todo }}
        </li>
    </template>
    ```

* 组件的v-model使用modelValue作为prop和update:modelValue作为事件。

* 具名插槽：name默认name: default

    ```html
    // base-layout内部
    <div class="container">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
    // 引用时
    <base-layout>
        <template v-slot:header> 
            <div>此处为header内容</div>
        </template>
        <template v-slot:default>
            <p>main</p>
        </template>
        <template v-slot:footer>
            <p>footer</p>
        </template>
    </base-layout>
    ```

* v-slot:缩写  #
* 父组件数据传子组件：
  * props
  * privde/inject  // 深度传值 不是被动绑定，父组件更改值子组件可能不会改变
    * 解决办法： 将ref property或reactive对此那个传给provide来更改此行动。使用组合式API computed property：

      ```js
      provide() {
          return {
              todoLength: Vue.computed(() => this.todos.length)
          }
      }
      ```

  * $attrs
* $refs只会在组件渲染完成之后生效。
* 渲染函数
  * h(): 用于创建vnode的实用程序
    * 参数：
      * 必需。一个 HTML 标签名、一个组件、一个异步组件，或者 null。{String | Object | Function | null} tag，使用 null 将会渲染一个注释。
      * 可选。{Object} props。与 attribute、prop 和事件相对应的对象。
      * 可选。子VNodes，使用h()构建.{String | Array | Object} children []
  * vnode虚拟节点：h()函数是一个用于创建vnode的实用程序

* 数据的响应式原理
    基本步骤
  * `Proxy拦截值`
  * `跟踪更改它的函数`：我们在 Proxy 中的 `getter` 中执行此操作，称为 `track`
  * `触发函数以便它可以更新最终值`：我们在 Proxy 中的 `setter` 中进行该操作，名为 `trigger`
    深入原理
  * 把一个普通的 JavaScript 对象作为 data 选项传给应用或组件实例
  * vue会使用带有getter和setter的处理程序遍历其所有property并将其转换为Proxy(ie : Object.defineProperty。但是Proxy 版本更精简，同时提升了性能。)

    ```js
    // 这是一个普通对象
        target: {
          width: 200,
          background: 'white'
        }
    // 转换为proxy
        const handler = {
          get(target, prop, receiver {
              // 某些操作，拦截
              ...
              return Reflect.get(...arguments)
          }
        }
        const proxiedObj = new Proxy(target, handler)
    // 转换后的对象
        proxiedObj: {
            width: 200,
            background: 'white'
        }
    ```

  * 在proxy内，使用track()函数，改变值

    ```js
      const handler = {
        get(target, prop, receiver) {
          // 某些操作，拦截
          track(target, prop)
          return Reflect.get(...arguments)
        }
      }
    ```

  * 当某些内容发生改变时，我们再设置新的值

    ```js
    const handler = {
      get(target, prop, receiver) {
          track(target, prop)
          return Reflect.get(...arguments)
      },
      set(target, key, value, receiver) {
          // 触发更新
          trigger(target, key)
          return Reflect.set(...arguments)
      }
    }
    ```

  * 当访问嵌套对象时：

    ```js
    const handler = {
      get(target, prop, receiver) {
        track(target, prop)
        const value = Reflect.get(...arguments)
        if (isObject(value)) {
            return reactive(value)
        } else {
            return value
        }
      }
      // ...
    }
    ```

  * 最后：每个组件都有一个相应的侦听器实例，该实例将在组件渲染期间把触碰的左右property记录为依赖项，之后当触发依赖项的setter时，就会通知侦听器，从而使得组件重新渲染
  * 问题：被代理对象和原始对象不相等（===）

    ```js
    const obj = {}
    const wrapped = new Proxy(obj, handlers)

    console.log(obj === wrapped) // false
    ```

* Proxy： 是一个包含另一个对象或函数并允许你对其进行拦截的对象。直白的来说，他是一个对象，而且能够拦截及改变其他对象的值。

    ```js
    // 用法
    new Proxy(target, handler)
    ```
