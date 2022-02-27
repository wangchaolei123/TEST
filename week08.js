/**
 * @param {number[][]} edges
 * @return {number[]}
 * @description 冗余连接
 */
var findRedundantConnection = function (edges) {
    let n = edges.length;
    let parent = new Array(n + 1).fill(0).map((_, idx) => idx);
    for (let i = 0; i < n; i++) {
        if (!union(parent, edges[i][0], edges[i][1])) return edges[i]
    }
    return [0];
};

function union(parent, x, y) {//合并两个点
    let daddyX = findDaddy(parent, x);
    let daddyY = findDaddy(parent, y);
    daddyX == daddyY ? 0 : parent[daddyY] = daddyX;
    return !(daddyX == daddyY)
}

function findDaddy(parent, idx) {//查找一个点的祖先
    while (parent[idx] != idx) {
        idx = parent[idx];
    }
    return idx;
}

//					0,1,2,3
//parent:		0,1,2,3
//size: 		1,1,1,1
class UnionFind {
    constructor(n) { //构造一个大小为n的集合
        this.count = n
        this.parent = new Array(n)
        this.size = new Array(n)  // size数组记录着每棵树的大小
        for (let i = 0; i < n; i++) {
            this.parent[i] = i; // 自己是自己的parent
            this.size[i] = 1;
        }
    }

    union(p, q) { //连通结点p和结点q, p和q都是索引
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP === rootQ) return
        // 元素数量小的接到数量多的下面，这样比较平衡
        if (this.size[rootP] > this.size[rootQ]) {
            this.parent[rootQ] = rootP;
            this.size[rootP] += this.size[rootQ];
        } else {
            this.parent[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
        }
        this.count--;
    }

    isConnected(p, q) { //判断p,q是否连通
        return this.find(p) === this.find(q)
    }

    find(x) { //找到x结点的root
        while (this.parent[x] != x) {
            // 进行路径压缩
            this.parent[x] = this.parent[this.parent[x]];
            x = this.parent[x];
        }
        return x;
    }

    getCount() { //返回子集个数
        return this.count;
    }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = (grid) => {
    let count = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {//循环网格
            if (grid[i][j] === '1') {//如果为陆地，count++，
                count++
                turnZero(i, j, grid)
            }
        }
    }
    return count
}
function turnZero(i, j, grid) {//沉没四周的陆地
    if (i < 0 || i >= grid.length || j < 0
        || j >= grid[0].length || grid[i][j] === '0') return //检查坐标的合法性
    grid[i][j] = '0'//让四周的陆地变为海水
    turnZero(i, j + 1, grid)
    turnZero(i, j - 1, grid)
    turnZero(i + 1, j, grid)
    turnZero(i - 1, j, grid)
}
