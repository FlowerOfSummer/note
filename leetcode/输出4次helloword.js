function repeat(func, times, wait) {
  //实现这个函数
  return function (str) {
    let count = 0;
    let id = setInterval(() => {
      if (++count === times) {
        clearInterval(id);
      }
      func(str);
    }, wait);
  };
}
// 使下面调用代码能正常工作
const repeatFunc = repeat(console.log, 4, 1000);
repeatFunc("hellworld"); //会输出4次 helloworld, 每次间隔3秒

repeatFunc("hellworld2");
