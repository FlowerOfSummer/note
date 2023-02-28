bala001
### 说一下 vue-router 的原理是什么？
实现原理：vue-router 的原理就是更新视图而不重新请求页面

vue-router 可以通过 mode 参数设置为三种模式：hash 模式、history 模式、abstract 模式。

* *** hash 模式 ***。默认是 hash 模式，基于浏览器 history api，使用 window.addEventListener("hashchange", callback, false) 对浏览进行监听。当调用 push 时，把新路由添加到浏览器访问历史的栈顶。使用 replace 时，把浏览器访问历史的栈顶路由替换成新路由 hash 的值（等于 url 中 # 及其以后的内容）。浏览器是根据 hash 值的变化，将页面加载到相应的 DOM 位置。锚点变化只是浏览器的行为，每次锚点变化后依然会在浏览器中留下一条历史记录，可以通过浏览器的后退按钮回到上一个位置。

* *** history 模式 ***。基于浏览器 history api，使用 window.onpopstate 对浏览器地址进行监听。对浏览器 history api 中的 pushState()、replaceState() 进行封装，当方法调用，会对浏览器的历史栈进行修改。从而实现 URL 的跳转而无需加载页面，但是它的问题在于当刷新页面的时候会走后端路由，所以需要服务端的辅助来完成，避免 url 无法匹配到资源时能返回页面。

* *** abstract *** 。不涉及和浏览器地址的相关记录。流程跟 hash 模式一样，通过数组维护模拟浏览器的历史记录栈 服务端下使用。使用一个不依赖于浏览器的浏览器历史虚拟管理后台