// 寄生组合式继承
function clone (parent, child) {
    child.prototype = Object.create(parent.prototype)
    child.prototype.constructor = child
}
function Parent () {
    this.name = 'Tom'
}
Parent.prototype.getName = function () {
    return this.name
}
function Child() {
    Parent.call(this)

}
clone(Parent, Child)
let a = new Child()
console.log(a.name)

// ES6 继承
// class Parent {
//     constructor() {
//         this.name = 'Tom'
//     }
//     getName = function  () {
//         return this.name
//     }
// }
// class Child extends Parent {
//     constructor() {
//         super()
//     }
// }
// let a = new Child()
// console.log(a.name)