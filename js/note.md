
* get/post请求长度限制误区；我们经常说get请求参数的大小存在限制，而post请求的参数大小是无限制的

不是get方法限制长度，而是浏览器和web服务器限制url长度。
* get可以使用缓存，因为给操作一般是查询，不需要每次都操作数据库。可以从缓存取。post不能使用缓存，因为post一般操作为增加/删除/修改，需要每次都操作数据库。


#### 类和继承

* 原型链继承：
  * 特点： 基于原型链，既是父类的实例，也是子类的实例。
  * 缺点： 无法实现多继承。

* 构造函数继承：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
  * 特点：可以实现多继承
  * 缺点： 只能继承父类实例的属性和方法，不能继承父类原型上的属性和方法
* 组合继承：（原型链继承和构造函数继承的组合体）
  * 特点：可以继承实例的属性和方法，也可以继承原型的属性和方法
  * 缺点：调用了两次父类，生成了两份实例
  
  ```js
    function Animal(name) {
      this.name = name;
      this.sleep = () => {
        console.log(`${this.name} is sleep!`)
      }
    }
    function Cat(name) {
      Animal.call(this);
      this.name = name;
    }
    Cat.prototype = new Animal();
    Cat.prototype.constructor = Cat;

    // Test Code
    var cat = new Cat('Tom');
    console.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat); // true
  ```

* 寄生组合式继承
  
  ```js
    function Cat(name) {
      Animal.call(this);
      this.name = name;
    }
    function Super () {}
    Super.prototype = Animal.prototype;

    Cat.prototype = new Super()
    var cat = new Cat('Anny');
    onsole.log(cat.name);
    console.log(cat.sleep());
    console.log(cat instanceof Animal); // true
    console.log(cat instanceof Cat); // true

  ```
