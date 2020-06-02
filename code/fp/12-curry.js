
    
// lodash 中的 curry 基本使用
// const _ = require('lodash')


function getSum (a, b, c) {
    return a + b + c
}

// const curried = _.curry(getSum)

const curried = curry(getSum)
console.log(curried(1,2,3))
console.log(curried(1)(2,3))
console.log(curried(1,2)(3))
    
function curry (func) {
    return function curriedFn (...args) {
        // 判断实参和形参的个数
        if (args.length < func.length) {
            return function () {
                // concat合并两个数组；Array.from（）将伪数组转换为数组
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}