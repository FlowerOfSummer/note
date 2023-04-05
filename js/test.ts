
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
