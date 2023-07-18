// 金额格式化函数，每3位添加一个逗号，忽略负号
function formatMoney(num) {
  if (typeof num !== "number") {
    // 如果num不是数字，直接返回
    return num;
  }
  const str = Math.abs(num).toString(); // 将num转为字符串并取绝对值
  let result = ""; // 定义结果字符串
  let count = 0; // 定义计数器
  const decimalIndex = str.indexOf("."); // 获取小数点的位置
  const integerPart = decimalIndex === -1 ? str : str.slice(0, decimalIndex); // 获取整数部分
  const decimalPart = decimalIndex === -1 ? "" : str.slice(decimalIndex); // 获取小数部分
  for (let i = integerPart.length - 1; i >= 0; i--) {
    // 从后往前遍历整数部分
    result = integerPart[i] + result; // 将当前字符添加到结果字符串的前面
    count++; // 计数器加1
    if (count % 3 === 0 && i !== 0) {
      // 如果计数器是3的倍数且不是第一个字符
      result = "," + result; // 在当前字符前面添加逗号
    }
  }
  if (num < 0) {
    // 如果num是负数
    result = "-" + result; // 在结果字符串前面添加负号
  }
  return decimalIndex === -1 ? result : result + decimalPart; // 如果是整数，直接返回结果字符串，否则将小数部分添加到结果字符串后面
}
