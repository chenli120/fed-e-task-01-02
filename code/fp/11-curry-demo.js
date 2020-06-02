
    
// 柯里化案例
// ''.match(/\s+/g) 
// ''.match(/\d+/g)

const _ = require('lodash')

function match (reg, str) {
    return str.match(reg)
}

const match = _.curry(function (reg, str) {
    return str.match(reg)
})

// 空格
const haveSpace = match(/\s+/g)
// 数字
const haveNumber = match(/\d+/g)


const filter = _.curry(function(funct, array){
    return array.filter(func)
})

const findSpace = filter(haveSpace)

// console.log(haveSpace('hello world'))
// console.log(haveSpace('helloworld'))
// console.log(haveNumber('abc123'))
// console.log(haveNumber('abc'))

console.log(filter(haveSpace,['John Conner','John_Donne']))

console.log(findSpace(['John Conner','John_Donne']))