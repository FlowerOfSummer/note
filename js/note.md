
* get/post请求长度限制误区；我们经常说get请求参数的大小存在限制，而post请求的参数大小是无限制的

不是get方法限制长度，而是浏览器和web服务器限制url长度。
* get可以使用缓存，因为给操作一般是查询，不需要每次都操作数据库。可以从缓存取。post不能使用缓存，因为post一般操作为增加/删除/修改，需要每次都操作数据库。


#### 类和继承

* 原型链继承：
  * 特点： 基于原型链，既是父类的实例，也是子类的实例。
  * 缺点： 无法实现多继承。

* 构造函数继承：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
  * 特点：可以实现多继承
  * 缺点： 只能继承父类实例的属性和方法，不能继承父类原型上的属性和方法
* 组合继承：（原型链继承和构造函数继承的组合体）
  * 特点：可以继承实例的属性和方法，也可以继承原型的属性和方法
  * 缺点：调用了两次父类，生成了两份实例
  
  ```js
    function Animal(name) {
      this.name = name;
      this.sleep = () => {
        console.log(`${this.name} is sleep!`)
      }
    }
    function Cat(name) {
      Animal.call(this);
      this.name = name;
    }
    Cat.prototype = new Animal();
    Cat.prototype.constructor = Cat;

    // Test Code
    var cat = new Cat('Tom');
    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat); // true
  ```

* 寄生组合式继承
  
  ```js
    function Cat(name) {
      Animal.call(this);
      this.name = name;
    }
    function Super () {}
    Super.prototype = Animal.prototype;

    Cat.prototype = new Super()
    var cat = new Cat('Anny');
    onsole.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat); // true

  ```
- Doctype作用? 
   Doctype声明文档类型，告诉浏览器使用哪种HTML或XML规范解析文档 
- 严格模式与混杂模式-如何触发这两种模式，区分它们有何意义?
   // 通过在代码开头添加以下语句来触发严格模式
    'use strict';
    // 混杂模式是默认模式，可以通过在文档类型声明中省略DTD来触发
    // 区分它们的意义在于，严格模式下会有更多的限制和更严格的错误检查，可以帮助开发者编写更加规范和安全的代码
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
- 经常遇到的浏览器的兼容性有哪些
```js

// 1. 不同的浏览器可能会以不同的方式解释CSS，导致样式不一致。
// 2. 旧版本的Internet Explorer可能不支持现代JavaScript功能。
// 3. 一些浏览器可能不支持某些HTML5元素或API。
// 4. 不同的浏览器可能具有不同的默认字体大小和行高，影响布局。
// 5. 一些浏览器可能不支持某些图像格式或CSS属性。

// 如果你需要解决这些问题，可以考虑使用CSS Reset或Normalize.css来规范化浏览器之间的差异。此外，可以使用Polyfills来模拟缺失的功能，以便在旧版本的浏览器中使用现代JavaScript功能和HTML5元素。
```
- border和outline的区别​编辑切换为居中添加图片注释
```js
border和outline的区别：
// 1. border是在盒子内部和外部都有的，而outline是在盒子外部的。
// 2. border可以设置不同的样式、宽度和颜色，而outline只能设置一种样式和颜色。
// 3. border可以分别设置上下左右四个方向的样式、宽度和颜色，而outline只能设置整个边框的样式和颜色。
// */

// // 将图片居中显示的CSS样式
// img {
//   display: block;
//   margin: 0 auto;
// } 

```
- 实现页面加载进度条
```js
// To implement a page loading progress bar, we can use the following code:

// First, create a div element with a class of "progress-bar" and append it to the body element
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

// Then, add a CSS style for the progress bar
const style = document.createElement('style');
style.innerHTML = `
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 5px;
    background-color: blue;
    transition: width 0.5s ease-in-out;
    z-index: 9999;
  }
`;

// Append the style to the head element
document.head.appendChild(style);

// Finally, update the width of the progress bar as the page loads
window.addEventListener('load', () => {
  progressBar.style.width = '100%';
}); 

// This will create a progress bar at the top of the page that starts at 0% width and gradually increases to 100% width as the page loads.
```
- 手动实现 parseInt​
```js
function myParseInt(str) {
  let num = 0;
  let sign = 1;
  let i = 0;
  const len = str.length;
  
  // handle leading white space
  while (str[i] === ' ') {
    i++;
  }
  
  // handle sign
  if (str[i] === '+' || str[i] === '-') {
    sign = str[i] === '+' ? 1 : -1;
    i++;
  }
  
  // handle digits
  while (i < len && str[i] >= '0' && str[i] <= '9') {
    num = num * 10 + (str[i] - '0');
    i++;
  }
  
  return sign * num;
}
```
- https://ac.nowcoder.com/discuss/696164?type=2&order=3&pos=20&page=0&channel=-1&source_id=discuss_tag_nctrack
- . css 动画 animation 各个时间值含义；
```js
/*
animation-duration: 动画执行时间
animation-timing-function: 动画执行速度曲线
animation-delay: 动画延迟执行时间
animation-iteration-count: 动画执行次数
animation-direction: 动画执行方向
animation-fill-mode: 动画执行前后状态
animation-play-state: 动画执行状态
*/
```
- css 如何实现让一个元素旋转并横向移动，如果只用一个 css 属性
```css
transform: translateX(100px) rotate(45deg);
```
- generator 有什么应用场景;
```js
// Generators可以用于异步编程，可以通过yield语句暂停函数执行，等待异步操作完成后再继续执行。
// Generators还可以用于惰性求值，可以在需要时才生成值，而不是一次性生成所有值。
// Generators还可以用于实现迭代器，可以通过yield语句返回一个值，从而实现对序列的遍历。
function* generatorFunction() {
  // generator function body
}

// 以下是使用generator的示例代码：
// 异步编程
function* asyncGenerator() {
  const result1 = yield asyncOperation1();
  const result2 = yield asyncOperation2(result1);
  return result2;
}

// 惰性求值
function* lazyGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

// 实现迭代器
function* iteratorGenerator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
} 

${INSERT_HERE}
```
-  git reset 与 revert 区别，revert 多个 mr 改如何处理
```js
// git reset 用于撤销提交，将 HEAD 指针指向之前的某个提交，同时将暂存区和工作区恢复到该提交状态
// git revert 用于撤销某个提交，但是会新建一个提交来记录这个撤销操作，因此不会改变历史提交记录
// 如果要 revert 多个 MR，可以使用 git revert -n 命令，然后手动解决冲突并提交


```
- git 如何撤回 add 后的内容
```js

// 如果您已经使用了 `git add` 命令将文件添加到暂存区，但是想要撤回这个操作，可以使用以下命令：
// git reset HEAD <file>
```
-  tcp 与 udp 的区别
```js
// TCP 是一种面向连接的协议，UDP 是一种无连接的协议。
// TCP 提供可靠的数据传输，UDP 不保证数据传输的可靠性。
// TCP 保证数据传输的顺序，UDP 不保证数据传输的顺序。
// TCP 的头部较大，UDP 的头部较小。
// TCP 的传输速度较慢，UDP 的传输速度较快。

// TCP协议是一种面向连接的协议，它在传输数据之前需要先建立连接，然后再进行数据传输。TCP协议提供可靠的数据传输，它通过确认机制和重传机制来保证数据传输的可靠性。TCP协议保证数据传输的顺序，因为它会对数据进行编号和排序。TCP协议的头部较大，因为它需要包含很多控制信息。TCP协议的传输速度较慢，因为它需要进行连接的建立和断开等操作。

// UDP协议是一种无连接的协议，它不需要建立连接就可以进行数据传输。UDP协议不保证数据传输的可靠性，因为它没有确认机制和重传机制。UDP协议不保证数据传输的顺序，因为它不会对数据进行编号和排序。UDP协议的头部较小，因为它只需要包含很少的控制信息。UDP协议的传输速度较快，因为它不需要进行连接的建立和断开等操作。



```
- 设计实现一个「星级评分」组件；
```js
// Here is an example implementation of a star rating component in JavaScript:

class StarRating extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this._rating = 0;
    this._maxRating = 5;
    this._hoverRating = 0;
    this._colors = {
      'default': '#cccccc',
      'rated': '#ffcc00',
      'hover': '#ff8000'
    };
  }

  connectedCallback() {
    this._render();
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    this._rating = value;
    this._render();
  }

  get maxRating() {
    return this._maxRating;
  }

  set maxRating(value) {
    this._maxRating = value;
    this._render();
  }

  _render() {
    let html = '';
    for (let i = 1; i <= this._maxRating; i++) {
      let color = i > this._rating ? this._colors.default : this._colors.rated;
      if (i <= this._hoverRating) {
        color = this._colors.hover;
      }
      html += `<span style="color: ${color};" data-rating="${i}">&#9733;</span>`;
    }
    this._root.innerHTML = html;
  }

  _setHoverRating(rating) {
    this._hoverRating = rating;
    this._render();
  }

  _resetHoverRating() {
    this._hoverRating = 0;
    this._render();
  }

  static get observedAttributes() {
    return ['rating', 'max-rating'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'rating') {
      this.rating = parseInt(newValue, 10);
    } else if (name === 'max-rating') {
      this.maxRating = parseInt(newValue, 10);
    }
  }

  connectedCallback() {
    this.addEventListener('mousemove', event => {
      const span = event.target.closest('span');
      if (!span) {
        this._resetHoverRating();
        return;
      }
      const rating = parseInt(span.getAttribute('data-rating'), 10);
      this._setHoverRating(rating);
    });
    this.addEventListener('mouseout', () => {
      this._resetHoverRating();
    });
    this.addEventListener('click', event => {
      const span = event.target.closest('span');
      if (!span) {
        return;
      }
      const rating = parseInt(span.getAttribute('data-rating'), 10);
      this.rating = rating;
    });
    this._render();
  }
}

customElements.define('star-rating', StarRating);
```
-  commonJS 与 ES6 模块化区别；
- webpack 了解么？loader、plugin 分别是干嘛的？如何实现一个 loader？
- 为什么vite、snowpack 可以比 webpack 快那么多？具体原理是；
- 什么是CSRF 攻击，怎么预防
```js
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
var data = [
  {userId: 8,  title: 'title1'},
  {userId: 11, title: 'other'},
  {userId: 15, title: null},
  {userId: 19, title: 'title2'}
];
var find = function(origin) {
  // your code are here...
}
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data).where({
  'title': /\d$/
}).orderBy('userId', 'desc');
console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
```
```js

// 题目二: 使用 React 或 Vue 技术栈实现一个流水线组件。

// 流水线组件.png

// 基本数据结构

interface Pipeline{
  stages: Stage[];
}
interface Stage{
  title: string;
  jobs: Job[];
}
  
interface Job{
  name: string;
  status: 'success' | 'fail';
  time: number; //毫秒时间戳
}
```