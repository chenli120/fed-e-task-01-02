// 函数组合  调试
// NEVER SAY DIE --> never-say-die

const fp = require('lodash/fp')

// const _ = require('lodash')

// const split = _.curry((sep, str) => _.split(str, sep))
// const join = _.curry((sep,array) => _.join(array, sep))
// const map = _.curry((fn,array) => _.map(array, fn))

// const f = _.flowRight(join('-'),map(_.toLower), split(' ')) 


const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower), fp.split(' ')) 

console.log(f('NEVER SAY DIE'))