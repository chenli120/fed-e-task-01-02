// 纯函数
// 记忆函数

const _ = require('lodash')

//计算圆面积的纯函数
function getArea (r) {
    console.log(r)
    return Math.PI * r * r
}

// _.memorize()： 接收一个纯函数作为参数，方法内部对这个纯函数进行处理，将纯函数的结果进行缓存，并且返回一个带记忆功能的函数
// let getAreaWithMemory = _.memorize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))


// 模拟memoize 方法的实现 
function memoize (f) {
    //将函数的参数作为Key ,将函数的返回值作为值
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments) //转为字符串
        //如果缓存中有值直接返回这个值，没有值则重新调用f
        cache[ley] = cache[key] || f.apply(f,arguments)
        return cache[key]
    }
}

let getAreaWithMemory = memorize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
