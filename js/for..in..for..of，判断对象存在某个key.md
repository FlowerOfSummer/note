### for...in
  可以遍历原型对象上的可枚举属性
  以任意顺序遍历一个对象的除Symbol以外的可枚举属性
  获取的是key.
  <!-- Object构造器有一个实例属性keys，则可以返回以对象的属性为元素的数组。数组中属性名的顺序跟使用for-in遍历返回的顺序是一样的。 -->
*** for-in 循环会枚举对象原型链上的可枚举属性，而Object.keys不会 ***
### for...of
  
 在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
 获取的是value

<!-- ["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]

输出：[null,null,3,-1]

解释：输出的结果其实就是 [CQueue(), appendTail(3), deleteHead(), deleteHead()] -->

function test () {
  const stask1 = []
  const stask2 = []
}
### js判断对象是否拥有某个key
- [key] in obj
  可判断key是否是obj对象上或**obj原型链上**的key
- obj.hasOwnProperty(key)
  可判断key是否是obj对象上的key