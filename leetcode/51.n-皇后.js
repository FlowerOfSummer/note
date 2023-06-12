/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const tempArr = [];
  const res = [];
  function queue(row) {
    if (row > n) {
      const temp = tempArr.map((item) => {
        let strArr = new Array(n).fill(".");
        strArr[item.y - 1] = "Q";
        return strArr.join("");
      });
      res.push([...temp]);
    }
    // 求y
    for (let i = 1; i <= n; i++) {
      if (row === 1 || count(row, i)) {
        tempArr[row - 1] = { x: row, y: i };
        queue(row + 1);
      }
    }
  }
  function count(x, y) {
    for (let a = 0; a < x - 1; a++) {
      // 如果是同一列 或者 是对角线
      if (y == tempArr[a].y || Math.abs(x - tempArr[a].x) == Math.abs(y - tempArr[a].y))
        //判断条件
        return false;
    }
    return true;
  }
  queue(1);
  return res;
};
// @lc code=end
