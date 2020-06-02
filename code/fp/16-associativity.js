// 结合律（associativity）
const _ = require('lodash')

// const reverse = arr => arr.reverse()
// const first = arr => arr[0]
// const toUpper = s => s.toUpperCase()

// const f = _.flowRight(_.toUpper, _.first, _.reverse)

// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f = _.flowRight(_.toUpper,_.flowRight( _.first, _.reverse))

console.log(f(['one','two','three']))