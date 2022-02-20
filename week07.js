/**
 * @param {number} n
 * @return {number}
 * @description 完全平方数
 */
var numSquares = function (n) {
    const dp = [...Array(n + 1)].map(_ => 0); // 数组长度为n+1，值均为0
    for (let i = 1; i <= n; i++) {
        dp[i] = i; // 最坏的情况就是每次+1
        for (let j = 1; i - j * j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
        }
    }
    return dp[n];
};
/**
 * @param {number[]} nums
 * @return {boolean}
 * @description 跳跃游戏
 */
var canJump = function (nums) {
    // 必须到达end下标的数字
    let end = nums.length - 1;

    for (let i = nums.length - 2; i >= 0; i--) {
        if (end - i <= nums[i]) {
            end = i;
        }
    }

    return end == 0;

};