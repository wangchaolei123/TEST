// 加一
/**
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 * @description 加一的第一种
 */
var plusOne1 = function (digits) {
    // 可以直接拼成字符串，过大的话转成bigInt，用bigint进行计算
    let a = BigInt(digits.join(''));
    let b = BigInt(1);

    let res = (a + b).toString().split('').map(i => i * 1)
    return res
};
/**
 * @param {number[]} digits
 * @return {number[]}
 * @description 加一的第二种
 */
var plusOne2 = function (digits) {
    let len = digits.length;
    // 从最后开始遍历
    for (let i = len - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            // 最后一位小于9的话，不用进一，加1，直接return
            digits[i]++
            return digits;
        } else if (i > 0 && digits[i] === 9) {
            // 为9的那个加1后得0
            digits[i] = 0;
        } else if (i === 0 && digits[i] === 9) {
            // 数组第一个为9,第一个放入1
            digits[i] = 0;
            digits.unshift(1);
            return digits
        }
    }
}
// 合并两个有序链表
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list2, list2) {
    // 递归
    if (!list1) return list2;
    if (!list2) return list1;
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
};
