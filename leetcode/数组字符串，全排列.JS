
const unique = (arr1, arr2) => {
    const res = []
    for(let i=0;i<arr1.length;i++) {
        for(let j=0;j<arr2.length;j++) {
            res.push(arr1[i]+arr2[j])
        }
    }
    return res
}
const permuteUnique = (ori, res=[]) => {
    for(let i=0;i<ori.length-1;i++) {
        res = unique(ori[i],ori[i+1])
        ori[i+1] = res
    }
    return res
}


// permuteUnique([['a','b'],['c','d']])
//  ['ac', 'ad', 'bc', 'bd']

// 字符串全排列
function permute(str) {
    // 将字符串转换为数组
    const arr = str.split('');
    // 用于存储所有排列结果的数组
    const result = [];
  
    // 递归函数，用于生成排列
    function generatePermutations(current, remaining) {
      // 如果没有剩余的字符，则将当前排列加入结果数组
      if (remaining.length === 0) {
        result.push(current.join(''));
        return;
      }
  
      // 遍历剩余的字符，将每个字符与当前排列组合，并递归生成下一级排列
      for (let i = 0; i < remaining.length; i++) {
        const next = current.concat(remaining[i]);
        const remainingChars = remaining.slice(0, i).concat(remaining.slice(i + 1));
        generatePermutations(next, remainingChars);
      }
    }
  
    // 调用递归函数开始生成排列
    generatePermutations([], arr);
  
    return result;
  }
  
  // 示例用法
  const str = 'abc';
  const permutations = permute(str);
  console.log(permutations); // 输出 ["abc", "acb", "bac", "bca", "cab", "cba"]