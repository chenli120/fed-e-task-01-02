//模拟常用高阶函数：map、every、some

// map:对 数组中的每一个元素进行遍历，并对每一个元素进行处理，并将处理的结果储存在一个新的数组中返回
const map = (array, fn) => {
    let results = []
    for (let value of array) {
        results.push(fn(value))
    }
    return results
}
//测试
let arr = [1,2,3,4]
arr = map(arr, v => v * v)
console.log(arr)  // [ 1, 4, 9, 16 ]

// every:判断数组中的每一个元素是否都匹配指定的条件，这个条件就是一个函数
const every = (array, fn) => {
    let result = true
    for (let value of array) {
        result = fn(value)
        if(!result){
            break
        }
    }
    return result
}
//测试
// let arr1 = [11,12,14]
// let r1 = every(arr1, v => v > 10)
// console.log(r1)  // true
// let arr2 = [11,12,9]
// let r2 = every(arr2, v => v > 10)
// console.log(r2) // false


// some: 判断数组中的是否有一个元素匹配指定的条件，这个条件就是一个函数
const some = (array, fn) => {
    let result = false
    for (let value of array) {
        result = fn(value)
        if(result){
            break
        }
    }
    return result
}
//测试
let arr1 = [1,3,4,9]
let r1 = some(arr1, v => v % 2  === 0)
console.log(r1)  // true
let arr2 = [1,3,5,9]
let r2 = some(arr2, v => v % 2  === 0)
console.log(r2)  // false