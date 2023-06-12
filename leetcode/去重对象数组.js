// 去重[{ a: 1, b: 2 }, { a: 1 }, { a: 1 }, { a: 1, b: { c: 1 } }, { b: { c: 1 }, a: 1 }]，不能使用JSON.stringify
function unique(arr) {
  const result = [];
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let key = "";
    for (const [k, v] of Object.entries(item).sort()) {
      key += `${k}:${v};`;
    }
    if (!map.has(key)) {
      map.set(key, true);
      result.push(item);
    }
  }
  return result;
}

const arr = [{ a: 1, b: 2 }, { a: 1 }, { a: 1 }, { a: 1, b: { c: 1 } }, { b: { c: 1 }, a: 1 }];
const uniqueArr = unique(arr);
console.log(uniqueArr);

// / 该函数用于去重数组中的元素
function unique(arr) {
  const result = []; // 定义一个空数组，用于存储去重后的元素
  const map = new Map(); // 定义一个Map对象，用于存储元素的键值对
  for (let i = 0; i < arr.length; i++) {
    // 遍历数组中的每个元素
    const item = arr[i]; // 获取当前元素
    const key = JSON.stringify(item); // 将当前元素转换成字符串作为键
    if (!map.has(key)) {
      // 如果Map对象中不存在该键
      map.set(key, true); // 将该键值对添加到Map对象中
      result.push(item); // 将当前元素添加到结果数组中
    }
  }
  return result; // 返回去重后的结果数组
}

const arr = [{ a: 1, b: 2 }, { a: 1 }, { a: 1 }, { a: 1, b: { c: 1 } }, { b: { c: 1 }, a: 1 }];
console.log(unique(arr)); // 输出去重后的结果数组
