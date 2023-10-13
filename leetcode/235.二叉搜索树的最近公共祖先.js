/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p 
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    while(root !== null) {
        if(p>root.val && q>root.val) {
            root = root.right
        } else if(p<root.val && q<root.val) {
            root = root.left
        } else {
            return root.val
        }
    }
    return root.val
    
};
// @lc code=end

