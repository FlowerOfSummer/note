/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let n = nums.length;
  nums.sort((a, b) => a - b);

  return nums[Math.floor(n / 2)];
};
// @lc code=end
