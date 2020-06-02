function objGroup(obj1, obj2) {
    obj1.next = obj2
    obj2.prev = obj1

    return {
        o1: obj1,
        o2: obj2
    }
}

let obj = objGroup({"name": 'obj1'}, {"name": 'obj2'})

console.log(obj)


function func() {
    name = 'lg'
    return `${name} is a coder`
}
func()

function func() {
    const name = 'lg'
    return `${name} is a coder`
}
func()