/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 * @description 搜索二维矩阵
 * //一维坐标转换成二维坐标
 */
var findNumberIn2DArray = function (matrix, target) {
    if (!matrix.length) return false;
    let x = matrix.length - 1, y = 0;
    while (x >= 0 && y < matrix[0].length) {
        if (matrix[x][y] === target) {
            return true;
        } else if (matrix[x][y] > target) {
            x--;
        } else {
            y++;
        }
    }
    return false;
};
/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 * @description 在 D 天内送达包裹的能力
 */
var shipWithinDays = function (weights, days) {
    // 传送带的最小载重应该是weights数组中元素的最大值，因为每次至少得装一件货物走，不能说装不下
    let left = Math.max(...weights),
        // 最大载重显然就是weights数组所有元素之和，也就是一次把所有货物都装走
        right = weights.reduce((pre, cur) => pre + cur) + 1;
    // 如果载重为 cap，是否能在 d 天内运完货物
    let canFinish = (w, d, cap) => {
        let i = 0;
        for (let day = 0; day < d; day++) {
            let maxCap = cap;
            while ((maxCap -= w[i]) >= 0) {
                i++;
                if (i == w.length) return true;
            }
        }
        return false;
    };
    // 左闭右开区间
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (canFinish(weights, days, mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
};

