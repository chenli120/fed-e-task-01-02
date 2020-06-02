 // IO 函子的问题
const fs = require('fs')
const fp = require('lodash/fp')

 class IO{
    static of(value) {
        return new IO(function () {
            return value
        })
    }

    constructor(fn) {
        this._value = fn
    }

    // 返回值
    map (fn) {
        // 把当前的 value 和 传入的 fn 组合成一个新的函数
        return new IO(fp.flowRight(fn, this._value))
    }

    join () {
        return this._value()
    }

    //返回函子
    flatMap (fn) {
        return this.map(fn).join()
    }

}


let readFile = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename,'utf-8')
    })
}

let print = function (x) {
    return new IO(function () {
        console.log(x)
        return x
    })
}


// IO(IO(x))
let r = readFile('../package.json')
            // .map(x => x.toUpperCase())
            .map(fp.toUpper)
            .flatMap(print)
            .join()
console.log(r)