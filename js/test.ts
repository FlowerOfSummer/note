
// 懒加载
function lazyLoad() {
  const images = document.querySelectorAll('img[data-src]'); // 获取所有需要懒加载的图片
  const len = images.length; // 获取图片数量
  let count = 0; // 计数器
  function lazyLoadImage() { // 懒加载函数
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动条距离顶部的距离
    const viewHeight = document.documentElement.clientHeight; // 获取可视区域高度
    for (let i = count; i < len; i++) { // 遍历所有需要懒加载的图片
      const offsetTop = images[i].offsetTop; // 获取图片距离顶部的距离
      if (offsetTop < scrollTop + viewHeight) { // 如果图片距离顶部的距离小于滚动条距离顶部的距离加上可视区域高度
        images[i].src = images[i].getAttribute('data-src'); // 将图片的src属性设置为data-src属性的值
        count++; // 计数器加1
      }
    }
  }
  lazyLoadImage(); // 调用懒加载函数
  window.addEventListener('scroll', lazyLoadImage); // 监听滚动事件
}

// 预加载
function preLoad() {
  const images = document.querySelectorAll('img[data-src]'); // 获取所有需要预加载的图片
  const len = images.length; // 获取图片数量
  let count = 0; // 计数器
  function preLoadImage() { // 预加载函数
    if (count >= len) { // 如果计数器大于等于图片数量
      return; // 直接返回
    }
    const img = new Image(); // 创建一个Image对象
    img.src = images[count].getAttribute('data-src'); // 将Image对象的src属性设置为data-src属性的值
    img.onload = function () { // 监听Image对象的onload事件
      count++; // 计数器加1
      preLoadImage(); // 递归调用preLoadImage函数
    }
  }
  preLoadImage(); // 调用预加载函数
}

lazyLoad();
preLoad();

// 实现一个深拷贝
function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) { // 如果obj不是对象或者为null，直接返回
    return obj;
  }
  let result;
  if (Array.isArray(obj)) { // 如果obj是数组
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result.push(deepCopy(obj[i])); // 递归调用deepCopy函数
    }
  } else { // 如果obj是对象
    result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) { // 判断key是否是obj自身的属性
        result[key] = deepCopy(obj[key]); // 递归调用deepCopy函数
      }
    }
  }
  return result;
}

// 金额格式化函数，每3位添加一个逗号，忽略负号
function formatMoney(num) {
  if (typeof num !== 'number') { // 如果num不是数字，直接返回
    return num;
  }
  const str = Math.abs(num).toString(); // 将num转为字符串并取绝对值
  let result = ''; // 定义结果字符串
  let count = 0; // 定义计数器
  const decimalIndex = str.indexOf('.'); // 获取小数点的位置
  const integerPart = decimalIndex === -1 ? str : str.slice(0, decimalIndex); // 获取整数部分
  const decimalPart = decimalIndex === -1 ? '' : str.slice(decimalIndex); // 获取小数部分
  for (let i = integerPart.length - 1; i >= 0; i--) { // 从后往前遍历整数部分
    result = integerPart[i] + result; // 将当前字符添加到结果字符串的前面
    count++; // 计数器加1
    if (count % 3 === 0 && i !== 0) { // 如果计数器是3的倍数且不是第一个字符
      result = ',' + result; // 在当前字符前面添加逗号
    }
  }
  if (num < 0) { // 如果num是负数
    result = '-' + result; // 在结果字符串前面添加负号
  }
  return decimalIndex === -1 ? result : result + decimalPart; // 如果是整数，直接返回结果字符串，否则将小数部分添加到结果字符串后面
}


const arr = [{
  id: 2,
  name: '部门B',
  parentId: 0
},
{
  id: 3,
  name: '部门C',
  parentId: 1
},
{
  id: 1,
  name: '部门A',
  parentId: 2
},
{
  id: 4,
  name: '部门D',
  parentId: 1
},
{
  id: 5,
  name: '部门E',
  parentId: 2
},
{
  id: 6,
  name: '部门F',
  parentId: 3
},
{
  id: 7,
  name: '部门G',
  parentId: 2
},
{
  id: 8,
  name: '部门H',
  parentId: 4
}
]
function transArrToTree(arr) {
  const res = {}
  const map = new Map()
  arr.forEach((item) => {
    
  })
}