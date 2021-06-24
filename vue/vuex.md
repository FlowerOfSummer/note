#### Vuex 分享

##### 引入背景

* 关联分析规则配置模块数据分析
* 动态节点，节点动态增添
* 递归条件，emit不知到哪个父组件

##### 定义

* Vuex是一个专为Vue.js应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有**组件的状态（state）**，并以相应的规则保证状态以一种**可预测的方式(mutation)**发生变化。
* 状态管理模式： state,view,actions

##### 核心概念

* state 单一状态树  mapState
* getter  mapGetters  --- 将store中的getter映射到局部的计算属性中
  * 通过属性访问： getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
  * 通过方法访问：getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
* mutation mapMutations  ---- 将store中的mutations映射为methods
* action mapActions  提交mutation，不直接更改state，可以包含任意异步操作

对比
    |  数据    |    计算属性   |    更改数据
Vue |  data    |    computed  |   methods
VueX|  state   |    getters   |   mutations

##### 项目结构


##### 表单处理

直接v-model违背了vuex只能在mutation中提交修改的原则，在严格模式下会报错。

* 利用computed计算属性的set()函数，提交修改

**问题**

* computed返回一个对象，set不到值（未被跟踪，不能双向绑定）
