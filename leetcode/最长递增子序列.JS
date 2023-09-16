/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let len = nums.length
    if(len<1){
        return len
    }
    let l = 1; // 定义返回的最长的子序列长度，最小为 1
    let dp=new Array(len).fill(1); // 定义动态规划状态数组,初始化每一位作为单独的序列为长度 1
    // 第一层循环，从第一位开始遍历，取出每一位元素，依次与前面所有元素做对比
    for(let i=1;i<len;i++){
        // 第二层循环，依次与前面所有元素做对比
        for(let j=0;j<i;j++){
            // 如果第一层取到的当前元素大于当前元素之前的某个元素
            if(nums[i]>nums[j]){
                // 则重新更新当前 i 所对应的状态值，更新为原来的值和当前在对比元素+1后的最大值
                dp[i] = Math.max(dp[i],dp[j]+1)
            }
        }
        // 每次循环之后，拿到当前最大的序列长度
        l = Math.max(l,dp[i])
    }
    return l
}