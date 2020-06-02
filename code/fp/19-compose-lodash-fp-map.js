// lodash 和 lodash/fp 模块-map方法的区别


// const _ = require('lodash')

// console.log(_.map(['23','8','10'], parseInt))  //[ 23, NaN, 2 ]
// // parseInt('23', 0, array) => (当前元素，索引，数组)
// // parseInt('8', 1 array)
// // parseInt('10', 2, array)
// parseInt()


const fp = require('lodash/fp')

console.log(fp.map(parseInt, ['23','8','10'])) // [ 23, 8, 10 ]
// parseInt只接收一个参数，即当前元素