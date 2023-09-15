/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let res = [];
  let path = [];
  const bt = function (used) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      //如果当前位置为1，代表当前元素已经使用过
      if (used[i] === 1) {
        continue;
      }
      path.push(nums[i]);
      used[i] = 1; //当前元素使用过
      bt(used);
      used[i] = 0; //回溯
      path.pop(); //回溯
    }
  };
  bt([]);
  return res;
};

// @lc code=end
