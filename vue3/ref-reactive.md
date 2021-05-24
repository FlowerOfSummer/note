#### ref与reactive的异同
* ref与reactive 定义基本元素类型数据时，ref定义的是包装后的响应式数据，而reactive 定义的还是原来的类型
    ```js
    const num1 = 2;
    const num2 = ref(2);
    const num3 = reactive(2);

    console.log(num1) // 2
    console.log(num2) // RefImpl {_rawValue: 2, _shallow: false, __v_isRef: true, _value: 2}
    console.log(num3) // 2
    ```
* 由于上条异同，也就是reactive定义基本类型不是响应式的,修改数据不能更新到模板
    ```js
    <template>
        <div class="about">
            <h1>This is an about page</h1>
            <button @click="add1()"> 修改num1</button>
            <button @click="add2()"> 修改num2</button>
            <button @click="add3()"> 修改num3</button>
            <div>
            <p>num1: {{num1}}</p>
            <p>num2: {{num2}}</p>
            <p>num3: {{num3}}</p>
            </div>
        </div>
        </template>
        <script>
        import { ref, reactive } from 'vue';
        export default {
        setup() {
            let num1 = 2;
            const num2 = ref(2);
            let num3 = reactive(2);

            console.log(num1)
            console.log(num2)
            console.log(num3)
            function add1() {
            num1 ++
            console.log(num1)
            }
            function add2() {
            num2.value ++
            console.log(num2.value)
            }
            function add3() {
            num3 ++
            console.log(num3)
            }
            return {
            num1,
            num2,
            num3,
            add1,
            add2,
            add3
            }
        }
        }
        function addNum(num) {
        num++
        }
        </script>
    ```
    > 如图，我们修改num1和num3效果是一样的，变量本身修改了，但是模板没有修改，因为不是响应式的。而ref定义的num2，就是响应式的，每次修改模板中也会相应的修改。
* reactive定义基本类型数据：
    * 用对象包裹
    * 用ref包裹
* 小结： ref定义基本类型数据，reactive定义复杂类型数据

##### watchEffect
* 立即执行传入的一个函数，并响应式追踪其依赖，并在其依赖变更时重新运行该函数。简单的说就是侦听一个响应式数据，当该数据发生变化时立即执行该函数
    ```js
    const count = ref(0)

    watchEffect(() => console.log(count.value))
    // -> 打印出 0

    setTimeout(() => {
    count.value++
    // -> 打印出 1
    }, 100)
    ```
* 停止侦听：
    * 组件卸载时自动停止
    * stop()显式停止
        ```js
        const stop = watchEffect(() => {
        /* ... */
        })

        // 之后
        stop()
        ```
* 清除副作用：主要针对一些异步操作时，当还未执行完当前异步操作，id又变化，这时就应该取消之前的异步操作。
    ```js
    watchEffect((onInvalidate) => {
        const token = performAsyncOperation(id.value)
        onInvalidate(() => {
            // id 改变时 或 停止侦听时
            // 取消之前的异步操作
            token.cancel()
        })
    })
    ```
* 访问dom或template refs: 在生命周期onMounted中访问

##### watch
* 等效于vue2中的this.$watch以及watch中相应的选项
* 与watchEffect相比，watch需要侦听特定的数据源，并在回调函数中执行副作用。
    * 懒执行副作用；
    * 更明确哪些状态的改变会触发侦听器重新运行副作用
    * 访问侦听状态变化前后的值