/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) return [];
  const result = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    // 遍历数组中的每个元素，直到倒数第三个元素
    if (i > 0 && nums[i] === nums[i - 1]) {
      // 如果当前元素与前一个元素相同，跳过当前循环
      continue;
    }
    let left = i + 1; // 定义左指针
    let right = nums.length - 1; // 定义右指针
    while (left < right) {
      // 当左指针小于右指针时，执行循环
      const sum = nums[i] + nums[left] + nums[right]; // 计算三个数的和
      if (sum === 0) {
        // 如果三个数的和为 0
        result.push([nums[i], nums[left], nums[right]]); // 将三个数添加到结果数组中
        while (left < right && nums[left] === nums[left + 1]) {
          // 如果左指针指向的元素与下一个元素相同，左指针向右移动
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          // 如果右指针指向的元素与前一个元素相同，右指针向左移动
          right--;
        }
        left++; // 左指针向右移动
        right--; // 右指针向左移动
      } else if (sum < 0) {
        // 如果三个数的和小于 0，左指针向右移动
        left++;
      } else {
        // 如果三个数的和大于 0，右指针向左移动
        right--;
      }
    }
  }
  return result; // 返回结果数组
};
// @lc code=end
