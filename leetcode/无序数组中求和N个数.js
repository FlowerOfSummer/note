// 定义一个非递归查找和的函数，参数为数组arr、整数N和整数M
function findSumNoRecursion(arr, N, M) {
  // 定义一个结果数组
  const result = [];
  // 定义一个栈，初始元素为一个对象，包含空临时数组、索引0、计数器0和求和0
  const stack = [{ tempArr: [], index: 0, count: 0, sum: 0 }];

  // 当栈不为空时，循环执行以下操作
  while (stack.length > 0) {
    // 从栈中弹出一个对象，解构赋值得到临时数组、索引、计数器和求和
    const { tempArr, index, count, sum } = stack.pop();

    // 如果计数器等于N且求和等于M，将临时数组的副本添加到结果数组中，继续下一次循环
    if (count === N && sum === M) {
      result.push(tempArr.slice());
      continue;
    }

    // 如果索引等于数组长度或计数器大于N或求和大于M，继续下一次循环
    if (index === arr.length || count > N || sum > M) {
      continue;
    }

    // 将一个对象压入栈中，包含当前临时数组、索引加1、当前计数器和当前求和
    stack.push({ tempArr, index: index + 1, count, sum });
    // 将一个对象压入栈中，包含当前临时数组添加当前索引的数组元素、索引加1、计数器加1和求和加上当前索引的数组元素
    stack.push({
      tempArr: tempArr.concat(arr[index]),
      index: index + 1,
      count: count + 1,
      sum: sum + arr[index],
    });
  }

  // 返回结果数组
  return result;
}
// 定义一个查找和的函数，参数为数组arr、整数N和整数M
function findSum(arr, N, M) {
  // 定义一个结果数组
  const result = [];
  // 定义一个递归函数，参数为临时数组tempArr、索引index、计数器count和求和sum
  const find = (tempArr, index, count, sum) => {
    // 如果计数器等于N且求和等于M，将临时数组的副本添加到结果数组中
    if (count === N && sum === M) {
      result.push(tempArr.slice());
      return;
    }
    // 如果索引等于数组长度或计数器大于N或求和大于M，返回
    if (index === arr.length || count > N || sum > M) {
      return;
    }
    // 递归调用，不改变临时数组、索引加1、计数器和求和保持不变
    find(tempArr, index + 1, count, sum);
    // 将当前索引的数组元素添加到临时数组中
    tempArr.push(arr[index]);
    // 递归调用，临时数组改变、索引加1、计数器加1、求和加上当前索引的数组元素
    find(tempArr, index + 1, count + 1, sum + arr[index]);
    // 从临时数组中移除最后一个元素
    tempArr.pop();
  };
  // 调用递归函数，初始参数为空数组、索引0、计数器0和求和0
  find([], 0, 0, 0);
  // 返回结果数组
  return result;
}

// 定义一个数组arr和整数N、M
const arr = [1, 2, 3, 4, 5];
const N = 3;
const M = 6;
// 调用findSum函数，获取满足条件的组合
const combinations = findSum(arr, N, M);
// 打印组合结果
console.log(combinations);

// 十六进制色值转换成rgba，支持4位和7位十六进制
function hexToRGBA(hex, alpha = 1) {
  if (hex.length === 4) {
    const r = parseInt(hex[1] + hex[1], 16);
    const g = parseInt(hex[2] + hex[2], 16);
    const b = parseInt(hex[3] + hex[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else if (hex.length === 7) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    throw new Error("Invalid hex color format");
  }
}

// 示例
const hexColor = "#FF5733";
const rgbaColor = hexToRGBA(hexColor, 0.5);
console.log(rgbaColor);
// rgba转换成十六进制色值
function rgbaToHex(r, g, b, a = 1) {
  const toHex = (value) => {
    const hex = Math.round(value).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const alpha = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
}

// 示例
const rgbaValues = { r: 255, g: 87, b: 51, a: 0.5 };
const hexColorFromRGBA = rgbaToHex(rgbaValues.r, rgbaValues.g, rgbaValues.b, rgbaValues.a);
console.log(hexColorFromRGBA);
// 使用Run Length Encoding (RLE)算法压缩数组
function compressArray(arr) {
  const compressed = [];
  let count = 1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      count++;
    } else {
      compressed.push(arr[i]);
      compressed.push(count);
      count = 1;
    }
  }

  return compressed;
}

// 使用Run Length Encoding (RLE)算法解压缩数组
function decompressArray(compressedArr) {
  const decompressed = [];

  for (let i = 0; i < compressedArr.length; i += 2) {
    const value = compressedArr[i];
    const count = compressedArr[i + 1];

    for (let j = 0; j < count; j++) {
      decompressed.push(value);
    }
  }

  return decompressed;
}

// 示例
const originalArray = [1, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4];
const compressedArray = compressArray(originalArray);
console.log("Compressed Array:", compressedArray);

const decompressedArray = decompressArray(compressedArray);
console.log("Decompressed Array:", decompressedArray);
