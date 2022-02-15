/**
 * @param {number} n
 * @return {number}
 * @description  爬楼梯
 */
var climbStairs = function (n) {
    const res = [null, 1, 2];
    for (let i = 3; i <= n; i++) {
        res[i] = res[i - 1] + res[i - 2];
    }
    return res[n]
};
/**
 * @param {number[][]} triangle
 * @return {number}
 * @description 三角形最小路径和
 */
var minimumTotal = function (triangle) {
    const bottom = triangle[triangle.length - 1];
    const dp = new Array(bottom.length);
    // base case 是最后一行
    for (let i = 0; i < dp.length; i++) {
        dp[i] = bottom[i];
    }
    // 从倒数第二列开始迭代
    for (let i = dp.length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
        }
    }
    return dp[0];
};