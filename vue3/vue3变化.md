#### Global API

##### 全局Vue Api已更改为使用应用程序实例

* vue2创建全局组件（new Vue()）缺点
  * 全局配置使得在测试期间很容易意外地污染其他测试用例
  * 全局配置使得在同一页面上的多个“app”之间共享同一个 Vue 副本非常困难，但全局配置不同
* vue3引入：createApp  返回一个应用实例

  ```js
  import { createApp } from 'vue'
  const app = createApp({})
  ```

* vue2.x全局api在vue3.x中变化

  * 对比
      | 2.x 全局 API               | 3.x 实例 API (`app`)
      | -------------------------- | --------------------------------------  |
      | Vue.config                 | app.config                              |
      | Vue.config.productionTip   | _removed_ (移除)                        |
      | Vue.config.ignoredElements | app.config.isCustomElement              |
      | Vue.component              | app.component                           |
      | Vue.directive              | app.directive                           |
      | Vue.mixin                  | app.mixin                               |
      | Vue.use                    | app.use                                 |
  > 所有其他不改变全局行为的全局 API 现在被命名为 exports
  * config.productiponTip移除，内部已经正确的配置了生产环境
  * config.ignoredElements 替换为config.isCustomElement
    * 支持原生自定义元素
* 插件使用

    ```js
    const app = createApp(MyApp)
    app.use(VueRouter)
    ```

* 挂载app实例

    ```js
    import { createApp } from 'vue';
    import MyApp from './myApp.vue/';
    const app = createApp(Myapp);
    app.mount('#app');
    ```

* 提供/注入 （provide/inject）

    ```js
    // 在入口
    app.provide({
    guide: 'Vue 3 Guide'
    })

    // 在子组件
    export default {
    inject: {
        book: {
        from: guide
        }
    },
    template: `<div>{{ book }}</div>`
    }
    ```

#### 全局和内部API已经被重构为tree-shakable

* 在 Vue 3 中，全局和内部 API 都经过了重构，并考虑到了 tree-shaking 的支持。全局API现在只能作为ES模块构建的命名到处进行访问
* 通过这一更改，如果模块绑定器支持 tree-shaking，则 Vue 应用程序中未使用的全局 api 将从最终捆绑包中消除，从而获得最佳的文件大小。（不通过全局引入，按需引入，文件更小）
* 受影响的Api
  * Vue.nextTick
  * Vue.observavle(用Vue.reactive替换)
  * Vue.version
  * Vue.compile(仅全构建)
  * Vue.set(仅兼容构建)
  * Vue.delets(仅兼容构建)

#### 模板指令的改变

##### 组件上v-model用法改变

* 描述：
  * `breaking`: 用于自定义组件时，v-model  `prop和事件默认名称`已更改
    * prop: `value` -> `modelValue`
    * event: `input` -> `update:modelValue`
  * `breaking`: v-bind的`.sync`修饰符和组件的`model`选项已移除，可用v-model作为替代
  * new: 现在可以在同一个组件上使用多个v-model进行双向绑定
  * new: 现在可以自定义v-model修饰符
* 实例

  ```html
  <ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

  <!-- 简写： -->

  <ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
  />
  ```
  
  ```html
  <ChildComponent v-model="pageTitle" />

  <!-- 简写: -->

  <ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
  />

  ```

##### **v-for**和**非v-for**节点上**key**用法更改

* 描述
  * new: 现在对于v-if/v-else/v-else-if的各项分支项key将不再是必须的，因为现在的Vue会自动生成唯一的key
    * breaking: 如果你手动提供 key，那么每个分支必须使用唯一的 key。你不能通过故意使用相同的 key 来强制重用分支。
  * breaking: <template v-for> 的 key 应该设置在 <template> 标签上 (而不是设置在它的子结点上)。

##### v-if与v-for的优先级对比

* 描述
  * breaking: 两者用于同一个元素上时，v-if会比v-for拥有更高的优先级

##### v-bind合并行为

* 描述
  * 不兼容：v-bind的绑定顺序会影响渲染结果
  * 在 3.x，如果一个元素同时定义了 v-bind="object" 和一个相同的单独的 property，那么声明绑定的顺序决定了它们如何合并。
  * vue2.x中是单独的属性总是会覆盖v-bind中的属性值
* 实例

  ```html
  <!-- template -->
  <div id="red" v-bind="{ id: 'blue' }"></div>
  <!-- result -->
  <div id="blue"></div>

  <!-- template -->
  <div v-bind="{ id: 'blue' }" id="red"></div>
  <!-- result -->
  <div id="red"></div>
  ```

* 迁移策略
  * 如果你依赖 v-bind 的覆盖功能，目前的建议是确保在单独的 property 之前定义 v-bind attribute。

##### v-for中的ref不再注册ref数组

* 描述
  * vue3.x中，v-for元素上使用ref，将不再自动在$ref中创建数组。
  * 要从单个绑定获取多个ref,将ref绑定到一个更灵活的函数上，这是一个新特性
* 实例

    ```html
    <div v-for="item in list" :ref="setItemRef"></div>
    ```

    ```js
    // 选项式Api
    export default {
        data() {
            return {
            itemRefs: []
            }
        },
        methods: {
            setItemRef(el) {
            this.itemRefs.push(el)
            }
        },
        beforeUpdate() {
            this.itemRefs = []
        },
        updated() {
            console.log(this.itemRefs)
        }
    }
    ```

    ```js
    // 组合式API
    import { ref, onBeforeUpdate, onUpdated } from 'vue'

    export default {
        setup() {
            let itemRefs = []
            const setItemRef = el => {
                itemRefs.push(el)
            }
            onBeforeUpdate(() => {
                itemRefs = []
            })
            onUpdated(() => {
                console.log(itemRefs)
            })
            return {
                itemRefs,
                setItemRef
            }
        }
    }
    ```

* 注意
  > itemRefs 不必是数组：它也可以是一个对象，其 ref 会通过迭代的 key 被设置。
  > 如果需要，itemRef 也可以是响应式的且可以被监听。

#### 组件

##### 只能使用普通函数创建功能组件

##### functional 属性在单文件组件 (SFC) <template> 和 functional 组件选项被抛弃

##### 异步组件需要defineAsyncComponent方法创建

* 描述
  * 新的 `defineAsyncComponent` 助手方法，用于`显式地`定义异步组件
  * `component` 选项重命名为 `loader`
  * `Loader`函数本身`不再接收` resolve 和 reject 参数，且必须返回一个 `Promise`
* 与2.x不同
  * 不再接收resolve和reject参数
  * 用defineAsyncComponent方法包装

  ```js
  // 2.x 版本
  const oldAsyncComponent = (resolve, reject) => {
  /* ... */
  }

  // 3.x 版本
  const asyncComponent = defineAsyncComponent(
  () =>
      new Promise((resolve, reject) => {
      /* ... */
      })
  )
  ```

* 实例

  ```js
    import { defineAsyncComponent } from 'vue'
    import ErrorComponent from './components/ErrorComponent.vue'
    import LoadingComponent from './components/LoadingComponent.vue'

    // 不带选项的异步组件  用defineAsyncComponent方法包装
    const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))

    // 带选项的异步组件
    const asyncPageWithOptions = defineAsyncComponent({
    loader: () => import('./NextPage.vue'),
    delay: 200,
    timeout: 3000,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent
    })
  ```

#### 渲染函数

##### 渲染函数Api改变

* 描述
  * h现在是全局导入，而不是隐式的作为参数传递给渲染函数
  * vnode 现在有一个扁平的 prop 结构
* render函数参数
  * vue2.x

    ```js
      export default {
          reder(h) {
              return h('div')
          }
      }
    ```

    * vue3.x 因为render函数不再接收参数，所以主要用于steup()函数内部。可以访问作用域中声明的被动状态和函数，以及传递给setup()的参数

    ```js
      import { h, reactive } from 'vue'

      export default {
      setup(props, { slots, attrs, emit }) {
          const state = reactive({
          count: 0
          })

          function increment() {
          state.count++
          }

          // 返回render函数
          return () =>
          h(
              'div',
              {
              onClick: increment
              },
              state.count
          )
        }
      }
    ```

##### slot统一

* 描述
  * this.$slots现在将slots作为函数公开
  * breaking: 移除this.$scopedSlots

#### 其他小改变

* destroyed生命周期选项被重命名为unmounted
* beforeDestroyed 生命周期选项被重命名为berforeOnmount

#### 移除API

* keyCode不在作为v-on的修饰符，不在支持config.keyCodes
* 移除$on,$off,$once
* 不在支持过滤
* 移除内联模板
* 移除$destroy 实例方法。用户不应再手动管理单个 Vue 组件的生命周期

#### 支持的库

* Vue cli v4.5.0
* Vue Router 4.0
* Vuex 4.0

#### 参考

* [从Vue2迁移-重大变化](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E9%87%8D%E5%A4%A7%E6%94%B9%E5%8F%98)
