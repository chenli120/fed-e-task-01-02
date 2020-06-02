// 模拟lodash 中的函数组合方法 _.flowRight()
// const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

// function compose (...args) {
//     return function (value) {
//         // reduce():对数组中的每个元素去执行一个我们提供的函数，并将其汇总成一个单个结果
//         return args.reverse().reduce(function (acc, fn) {
//             return fn(acc)
//             //设置acc的初始值
//         }, value)
//     }
// }

//es6实现
const compose = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc),value)

const f = compose(toUpper, first, reverse)
console.log(f(['one','two','three']))