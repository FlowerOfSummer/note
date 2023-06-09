/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let temp = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < nums.length; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum - target === 0) {
        return target;
      }
      if (Math.abs(sum - target) < Math.abs(temp - target)) {
        temp = sum;
      }
      if (sum - target >= 0) {
        r--;
      } else {
        l++;
      }
    }
  }

  return temp;
};
// @lc code=end
