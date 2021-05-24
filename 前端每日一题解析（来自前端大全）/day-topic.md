
### 2020.5.24

* 题目
  一下代码输出什么

  ```js
    const person = {
      name: "Lydia",
      age: 21
    }

    const changeAge = (x = { ...person }) => x.age += 1
    const changeAgeAndName = (x = { ...person }) => {
      x.age += 1
      x.name = "Sarah"
    }

    changeAge(person)
    changeAgeAndName()

    console.log(person)
  ```

  * A: {name: "Sarah", age: 22}
  * B: {name: "Sarah", age: 23}
  * C: {name: "Lydia", age: 22}
  * D: {name: "Lydia", age: 23}
* 答案及题解
  C
  首先我们需要知道的知识点是，函数参数的默认值。当函数没有传参的时候，会给定一个默认值。这儿changeAge()和changeAgeAndName()函数,参数x的默认值都是{...person}.
  其次，我们要知道的是对象的拓展运算符，拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。这个拷贝为深拷贝。
  所以，当我们直接将person作为参数传给changeAge(person)函数时，此时的参数为对象person的浅拷贝，参数person和对象person的地址指向为同一个，所以修改person参数的值，对象person也会改变。而当我们调用changeAgeAndName()函数时，因为没有给函数传参，所以就会使用默认参数，也就是person对象的深拷贝。修改该值不会影响对象person的值

