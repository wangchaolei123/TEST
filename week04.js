const { textChangeRangeIsUnchanged } = require("typescript");

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 * @description 被围绕的区域
 */
const solve = board => {
    // flag为true代表是中间的O
    const dfs = (i, j, flag) => {
        if (i < 0 || i >= m || j < 0 || j >= n || visited[i][j] || board[i][j] === 'X') return;
        // 访问标记
        visited[i][j] = 1;
        // 中间的O，则替换成X
        if (flag) board[i][j] = 'X';
        dfs(i + 1, j, flag);
        dfs(i, j + 1, flag);
        dfs(i - 1, j, flag);
        dfs(i, j - 1, flag);
    };
    const [m, n] = [board.length, board[0].length];
    const visited = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 先对边缘的所有相连O，作一次访问标记
            if ((i === 0 || i === m - 1 || j === 0 || j === n - 1) && board[i][j] === 'O') {
                dfs(i, j, false);
            }
        }
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 再处理中间的所有相连O
            if (i !== 0 && i !== m - 1 && j !== 0 && j !== n - 1 && board[i][j] === 'O') {
                dfs(i, j, true);
            }
        }
    }
    return board;
};
/**
 * @description 设计推特
 */
class Twitter {
    constructor() {
        this.followMap = {}
        this.postMap = new Map()
        this.latestPostId = 0
    }
    /** 
     * @param {number} userId 
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        const postTime = this.latestPostId++
        let tweeList = [{ tweetId, postTime }]
        if (this.postMap.has(userId)) {
            tweeList = tweeList.concat(this.postMap.get(userId))
        }
        this.postMap.set(userId, tweeList)
    }
    /**
     * Retrieve the 10 most recent tweet ids in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user herself. Tweets must be ordered from most recent to least recent.
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const followeeIdList = this.followMap[userId] ? [...this.followMap[userId]] : []
        const tweeList = []
        const userIds = [...new Set(followeeIdList.concat([userId]))]
        userIds.forEach(uid => {
            if (this.postMap.has(uid)) {
                tweeList.push(...this.postMap.get(uid).slice(0, 10))
            }
        })
        tweeList.sort((a, b) => b.postTime - a.postTime)

        return tweeList.slice(0, 10).map(item => item.tweetId)
    }
    /** 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (this.followMap[followerId]) {
            this.followMap[followerId].add(followeeId)
        } else {
            this.followMap[followerId] = new Set([followeeId])
        }
    }
    /** 
     * @param {number} followerId 
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap[followerId]) {
            this.followMap[followerId].delete(followeeId)
        }
    }
}
const twi = new Twitter();
