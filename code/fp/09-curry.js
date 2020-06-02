
    
    // 柯里化演示: 


    // 纯的(有硬编码，后续通过柯里化解决) 
    // function checkAge (age){
    //     let mini = 18
    //     return age >= mini
    // }
    
    // 普通纯函数
    // function checkAge (mini,age){
    //     return age >= mini
    // }

    // console.log(checkAge(18,20))
    // console.log(checkAge(18,24))
    // console.log(checkAge(22,24))

    //函数的柯里化
    // function checkAge (mini){
    //     return function (age) {
    //         return age >= mini
    //     }
    // }

    //es6
    let checkAge = min => (age => age >= min)

    let checkAge18 = checkAge(18)
    let checkAge22 = checkAge(22)

    console.log(checkAge18(20))
    console.log(checkAge18(24))
    
