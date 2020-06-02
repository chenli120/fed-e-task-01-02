// getSalary(12000, 2000)
// getSalary(15000, 3000)
// getSalary(15000, 4000)

function makeSalary (base) {
    return function (performance) {
        return base + performance
    }
} 

let salaryLevel1 = makeSalary(12000)
let salaryLevel2 = makeSalary(15000)

console.log(salaryLevel1(2000))
console.log(salaryLevel2(3000))
console.log(salaryLevel2(4000))