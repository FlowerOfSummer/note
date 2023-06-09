/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const res = [];
  for (let i = 0; i < s.length; i++) {
    const temp = res.at(-1);
    const map = {
      ")": "(",
      "]": "[",
      "}": "{",
    };
    if (map[s[i]] && map[s[i]] === temp) {
      res.pop();
    } else {
      res.push(s[i]);
    }
  }
  return res.length === 0;
};
// @lc code=end
