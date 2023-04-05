```js
function repeat(fn, times, wait) {
    let timer = null 
    let count = 0
    return function (str) {
        timer  = setInterval(() => {
            count++
            if(count === times) {
                clearInterval(timer)
            }
            fn(str)
        },wait)
    }
}
const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc("hellworld"); //会输出4次 helloworld, 每次间隔3秒

repeatFunc("hellworld2");
```
如何实现浏览器内多个标签页之间的通信?
模块化开发怎么做？
7.Web Worker

8.V8 垃圾回收机制  https://zhuanlan.zhihu.com/p/520393745

9.内存泄露

天平找次品  3的n次方，n次
项目中的跨域如何处理的
懒加载如何判断元素出现在视口内？
如何判断是手机端还是PC端
H5 与手机是如何通信的？
SSR服务端渲染的理解。
大文件上传如何解决？
https://blog.csdn.net/aaqingying/article/details/128434993
1.10.5 AMD规范
1.10.6 CMD
 z-index什么情境下失效
 懒加载、预加载