// 代码题1
// 基于以下代码完成下面四个练习
const fp = require('lodash/fp')
// 数据
// horsepower 马力， doller_value 价格，in_stock 库存
const cars = [
    {name: "Ferrari FF", horsepower: 660, doller_value: 700000, in_stock:true},
    {name: "Jaguar XKR-S", horsepower: 550, doller_value: 132000, in_stock:false},
    {name: "Audi R8", horsepower: 525, doller_value: 114200, in_stock:false},
    {name: "Aston Martin One-77", horsepower: 750, doller_value: 1850000, in_stock:true},
    {name: "Pagani Huayra", horsepower: 700, doller_value: 1300000, in_stock:false},
]

// 练习1：使用函数组合fp.flowRight()重新实现这个函数
let isLastInStock = function(cars) {
    //获取最后一条数据
    let last_car = fp.last(cars)
    //获取最后一条数据的in_stock属性值
    return fp.prop('in_stock', last_car)
}
//代码如下
let r1 = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(r1(cars)) // 打印结果： false

//练习2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
//代码如下
let r2 = fp.flowRight(fp.prop('name'), fp.first)
console.log( r2(cars)) // 打印结果：  Ferrari FF


// 练习3: 使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}
// <-无须改动
let averageDollarValue = function(cars) {
    let dollar_values = fp.map(function(car) {
        return car.dollar_value
    }, cars)
    return _average(dollar_values)
}

//代码如下
let averageDollarValue1 = fp.flowRight(_average, fp.map(fp.prop('doller_value'))) 
console.log(averageDollarValue1(cars))  // 打印结果：819240

// 练习4：
// 使用flowRight写一个sanitizeName()函数，返回一个下划线连接的小写字符串，把数组中的name转换为这种形式：
// 例如： sanitizeName(["Hello World"]) => ["hello_world"]
let _underscore = fp.replace(/\W+/g, '_') // <--无须改动，并在sanitizeName中使用它
//代码如下 sanitizeName(["Hello World"])
let sanitizeName = fp.flowRight(_underscore,fp.toLower)
console.log(sanitizeName(["Hello World"]))


// 代码题2
// 基于下面提供的代码，完成后续的四个联系
// support.js

class Container{
    static of(value) {
        return new Container(value)
    }

    constructor(value) {
        this._value = value
    }

    map (fn) {
        return Container.of(fn(this._value))
    }
}


class Maybe{
    static of(x) {
        return new Maybe(x)
    }

    constructor(x) {
        this._value = x
    }

    map (fn) {
        return this.isNothing() ? this : Maybe.of(fn(this._value))
    }

    isNothing () {
        return this._value === null || this._value === undefined
    }
}

// module.export = {
//     Maybe,
//     Container
// }

// 练习1：
// 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
// const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])
// --------代码如下---------
let ex1 = maybe.map(x => fp.flowRight(fp.map(y => fp.add(2))))
console.log(maybe._value)
console.log(ex1._value)

//练习2：
// 实现一个函数ex2, 能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do','ray','me','fa','so','la','si'])
let ex2 = xs.map(x => fp.first(x))
// --------代码如下---------
console.log('ex2', ex2._value) // do


// 练习3：
// 实现一个函数ex3，使用safeProp 和 fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x,o) {
    console.log('o[x]',o[x])
    return Maybe.of(o[x])
})
let user = { id: 2, name: "Albert" }
let ex3 = safeProp('name', user).map(x => fp.first(x))
// --------代码如下---------
console.log('ex3', ex3._value) // A



// 练习4：使用Maybe 重写ex4,不要有if语句
let ex4 = function (n) {
    if (n) { return parseInt(n) }
}
// --------代码如下---------
let ex4xs = fp.curry(function (n) {
    return Maybe.of(n).map(x => parseInt(n))
})
console.log('ex4s',ex4xs('2')._value) // 2