// 数组的度
/**
 * @param {number[]} nums
 * @return {number}
 */
var findShortestSubArray = function (nums) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], [1, i, i]);
        } else {
            let arr = map.get(nums[i]);
            arr[0]++;
            arr[2] = i;
            map.set(nums[i], arr);
        }
    }
    let max = 0;
    for (let i of map.values()) {
        max = Math.max(i[0], max);
    }
    let minLen = 0;
    let res = [];
    for (let i of map.values()) {
        if (i[0] === max) {
            res.push(i);
        }
    }
    minLen = res[0][2] - res[0][1] + 1;
    for (let i = 1; i < res.length; i++) {
        minLen = Math.min(
            res[i][2] - res[i][1] + 1, minLen
        );
    }
    return minLen;
};
//
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * @description 和为 K 的子数组
 */
var subarraySum = function (nums, k) {
    let map = new Map();
    let pre = 0;
    let res = 0;
    map.set(pre, 1)
    for (let i = 0; i < nums.length; i++) {
        pre += nums[i];
        let v1 = map.get(pre - k);
        res += v1 ? v1 : 0;
        let v2 = map.get(pre)
        map.set(pre, v2 ? v2 + 1 : 1)
    }
    return res;
};
