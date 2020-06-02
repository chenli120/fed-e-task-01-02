// folktale 中的 compose 、curry
const { compose, curry } =  require('folktale/core/lambda')
const { toUpper, first } = require('lodash/fp')

// let f = curry(2, (x, y) => {
//     return x + y
// })

// console.log(f(1,2))  // 3
// console.log(f(1)(2)) // 3

let f = compose(toUpper,first)
console.log(f(['one','two'])) // ONE