//高阶函数-函数作为参数
// forEach
function forEach(array,fn) {
    for(let i = 0; i < array.length; i++){
        fn(array[i])
    }    
}

//测试
let arr1 = [1,2,3,4,5,6,7]
forEach(arr1,function(a){
    console.log(a)
})

// filter --遍历并过滤
function filter(array,fn){
    let results = []
    for(let i = 0; i < array.length; i++){
        if(fn(array[i])){
            results.push(array[i])
        }
    }    
    return results
}

//测试
let arr2 = [1,2,3,4,5,6,7]
let r = filter(arr2,function(a){
    return a%2===0
})
console.log(r)
