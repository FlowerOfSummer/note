- link 和@import 的区别是?
```js
// link 和 @import 的区别是：
// link 可以引入任何类型的文件，而 @import 只能引入 CSS 文件。
// link 在页面加载时同时加载，而 @import 是在页面加载完毕后加载。
// link 可以通过 rel 属性指定关系，如 icon、stylesheet 等，而 @import 不能。
// link 可以通过 JavaScript 操作 DOM 动态引入，而 @import 不行。 
<link rel="stylesheet" href="style.css">
<style>
  @import url("print.css") print;
</style>
```