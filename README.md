简答题
1.描述引用计数的工作原理和优缺点
**引用计数算法工作原理**
    ·核心思想：设置引用数，判断当前引用数是否为0
    ·引用计数器
    ·引用关系改变时修改引用数字
    ·引用数字为0时立即回收
**引用计数算法优缺点**
    ·优点
        ·发现垃圾时立即回收
        ·最大限度减少程序暂停（减少程序卡顿时间）---应用程序过程中消耗内存，发现内存快被占满时，
    ·缺点
        ·无法回收**循环引用**的对象  04-circular-reference.js
        ·时间开销大（资源消耗大）---需要维护数值的变化，时刻监控引用数字是否修改，修改就需要耗时

2.描述标记整理算法的工作流程
    ·核心思想： 分标记和清除两个阶段，标记整理可以看做是标记清楚的增强
    ·1.标记：遍历所有对象标记活动对象
    ·2.清除：遍历所有对象，先执行整理，移动对象位置，最后清除没有标记对象
    ·3.回收相应的对象

3.描述V8中新生代存储区垃圾回收的流程
    ·新生代对象回收实现
        1·回收过程采用**复制算法 + 标记整理**
        2·新生代内存区分为两个等大小空间
        3·使用空间from,空闲空间为To
        4·活动对象存储于From空间
        5·标记整理后活动对象拷贝至To
        6·From于To交换空间完成释放
    ·回收细节说明
        ·拷贝过程过程中可能出现晋升
        ·晋升就是讲新生代对象移动至老生代
        ·一轮GC还存活的新生代需要晋升
        ·To空间的使用率超过25%

4.描述增量标记算法在何时使用，及工作原理
    ·在V8回收老生代对象时使用
        ·主要采用**标记清除、标记整理、增量标记算法**
        ·首先使用标记清除完成垃圾空间的回收
        ·采用标记整理进行空间优化
        ·最后采用增量标记进行效率优化
    ·工作原理---增量标记如何优化垃圾回收
        垃圾回收时会阻塞程序的执行，增量标记将一整段垃圾回收操作分成几段进行（直接可达，间接可达，完成清理一步一步执行），
        实现垃圾回收与程序回收的交替执行，提高用户体验


代码题运行请到  ../code/Part1Modal2.js
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
