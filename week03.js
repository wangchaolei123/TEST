/**
 * @param {number[]} nums
 * @return {number[][]}
 * @description 全排列
 */
var permuteUnique = function (nums) {
    // 先进行排序
    nums.sort((a, b) => {
        return a - b
    })
    let res = []
    let arr = []

    const dfs = (temp) => {
        if (arr.length === nums.length) {
            res.push(arr.slice())
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] === nums[i - 1] && !temp[i - 1]) {
                // 前者与后者相同跳过此次循环
                continue
            }
            if (!temp[i]) {
                temp[i] = true
                arr.push(nums[i])
                dfs(temp)
                arr.pop()
                temp[i] = false
            }


        }
    }
    dfs([])
    return res
};
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * @description 课程表2
 */
var findOrder = (numCourses, prerequisites) => {
    let arr = new Array(numCourses).fill(0) // 初始化入度数组
    let obj = {} // 数据缓存
    for (let i = 0; i < prerequisites.length; i++) {
        arr[prerequisites[i][0]]++ // 构建入度数组
        if (obj[prerequisites[i][1]]) { // 构建哈希表
            obj[prerequisites[i][1]].push(prerequisites[i][0])
        } else {
            let list = []
            list.push(prerequisites[i][0])
            obj[prerequisites[i][1]] = list
        }
    }
    let res = [] // 结果数组
    let queue = [] // 存放 入度为0的课
    for (let i = 0; i < numCourses; i++) { // 起初推入所有入度为0的课
        if (arr[i] === 0) queue.push(i)
    }
    while (queue.length) { // 没有了入度为0的课，没课可选，结束循环
        let cur = queue.shift() // 出栈，代表选这门课
        res.push(cur) // 推入结果数组
        let toEnQueue = obj[cur] // 查看哈希表，获取对应的后续课程
        if (toEnQueue && toEnQueue.length) { // 确保有后续课程
            for (let i = 0; i < toEnQueue.length; i++) { // 遍历后续课程
                arr[toEnQueue[i]]-- // 将后续课程的入度 -1
                if (arr[toEnQueue[i]] == 0) { // 一旦减到0，让该课入列
                    queue.push(toEnQueue[i])
                }
            }
        }
    }
    return res.length === numCourses ? res : [] // 选齐了就返回res，否则返回[]
};
