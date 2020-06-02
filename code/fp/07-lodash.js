// 演示lodash  纯函数代表
// first / last / toUpper / reverse / each / includes / find / findIndex
// 安装： 1.初始化package : npm init -y 2.安装lodash: npm i lodash   cls
// 引用lodash
const _ = require('lodash')

const array= ['jack', 'tom', 'lucy', 'kata']

console.log(_.first(array)) // ==console.log(_.head(array))
console.log(_.last(array))

console.log(_.toUpper(_.first(array)))


//数组中的reverse不是纯函数 array.reverse() 倒序输出
console.log(_.reverse(array))

// _.each 遍历数组 == _.forEach
const r = _.each(array, (item,index) => {
    console.log(item, index)
})

console.log(r) // 打印数组本身








