/**
 * 多个请求并发控制
 * @param {Array} urls 请求地址数组
 * @param {Number} maxNum 最大并发数
 * @returns {Promise} Promise 对象
 */
// 实现一个多个请求并发控制的函数
function multiRequest(urls, maxNum) {
    const len = urls.length; // 获取请求地址数组的长度
    const result = new Array(len).fill(false); // 创建一个长度为 len 的数组，用于存储请求结果
    let count = 0; // 计数器，用于记录已经完成的请求数量
    return new Promise((resolve, reject) => {
      // 返回一个 Promise 对象
      while (count < maxNum) {
        // 当已完成的请求数量小于最大并发数时，继续发起请求
        next(); // 发起请求
      }
      function next() {
        // 发起请求的函数
        let current = count++; // 获取当前请求的索引，并将计数器加 1
        if (current >= len) {
          // 如果当前请求的索引大于等于请求地址数组的长度
          !result.includes(false) && resolve(result); // 如果 result 数组中不包含 false，则说明所有请求都已完成，此时将 Promise 对象的状态设置为已完成
          return; // 结束函数的执行
        }
        const url = urls[current]; // 获取当前请求的地址
        fetch(url) // 发起请求
          .then((res) => {
            result[current] = res; // 将请求结果存储到 result 数组中
            if (current < len) {
              // 如果当前请求的索引小于请求地址数组的长度
              next(); // 继续发起请求
            }
          })
          .catch((err) => {
            result[current] = err; // 将请求错误信息存储到 result 数组中
            if (current < len) {
              // 如果当前请求的索引小于请求地址数组的长度
              next(); // 继续发起请求
            }
          });
      }
    });
  }