### css 如何实现让一个元素旋转并横向移动，如果只用一个 css 属性
```css
transform: translateX(100px) rotate(45deg);
```

###  实现页面加载进度条
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

### border和outline的区别​编辑切换为居中添加图片注释
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
