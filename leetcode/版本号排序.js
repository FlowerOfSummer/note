// 对版本号进行排序
function sortVersion(versions) {
  return versions.sort((a, b) => {
    // 将版本号字符串转换为数组
    const aArr = a.split(".");
    const bArr = b.split(".");
    // 获取版本号数组的最大长度
    const len = Math.max(aArr.length, bArr.length);
    // 逐个比较版本号数组中的数字
    for (let i = 0; i < len; i++) {
      // 将版本号数组中的数字转换为整数，如果无法转换则默认为0
      const aNum = parseInt(aArr[i]) || 0;
      const bNum = parseInt(bArr[i]) || 0;
      // 如果两个数字不相等，则返回它们的差值
      if (aNum !== bNum) {
        return aNum - bNum;
      }
    }
    // 如果所有数字都相等，则返回0
    return 0;
  });
}

// 示例
const versions = ["1.0.2", "1.0.1", "1.0.0", "1.0", "1.0.3", "1.0.10"];
console.log(sortVersion(versions));
