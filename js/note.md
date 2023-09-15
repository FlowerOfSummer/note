
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
```js
// Webpack is a module bundler that takes modules with dependencies and generates static assets representing those modules.

// Loaders are transformations that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. 

// Plugins are used to extend the functionality of Webpack. They can be used to perform a wider range of tasks like bundle optimization, asset management, and injection of environment variables.

// To create a loader, you need to export a function that takes the source code as input and returns the transformed source code as output. The function should also include a set of options that can be passed to the loader. 

${INSERT_HERE}
// To create a loader, you need to export a function that takes the source code as input and returns the transformed source code as output. The function should also include a set of options that can be passed to the loader. 

// Here's a simple implementation of a webpack loader that compresses images using imagemin:

const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = function(source) {
  const callback = this.async();
  imagemin.buffer(source, {
    plugins: [
      imageminMozjpeg()
    ]
  }).then(buffer => {
    callback(null, buffer);
  }).catch(error => {
    callback(error);
  });
};
// Here's a simple implementation of a webpack plugin that converts px to rem:

const pxToRem = require('postcss-pxtorem');

module.exports = class PxToRemPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('PxToRemPlugin', (compilation, callback) => {
      const cssAssets = Object.keys(compilation.assets).filter(asset => asset.endsWith('.css'));
      cssAssets.forEach(asset => {
        const source = compilation.assets[asset].source();
        postcss([pxToRem]).process(source).then(result => {
          compilation.assets[asset] = {
            source: () => result.css,
            size: () => result.css.length
          };
        }).catch(error => {
          console.error(error);
        });
      });
      callback();
    });
  }
};
```