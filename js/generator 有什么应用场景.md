###  generator 有什么应用场景;
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
```