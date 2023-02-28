// 自己实现vue的绑定
export class MyVue {
  private template
  private data
  constructor(config) {
    this.template = document.querySelector(config.el);
    this.data = reactive(config.data);
    for(let name in config.methods) {
      // console.log(name)
      this[name] = () => {
        config.methods[name].apply(this.data);
      }
    };
    this.traversal(this.template);
  }
  traversal(node) {
    // 模板语法
    if(node.nodeType === Node.TEXT_NODE) {
      if(node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
        let name = RegExp.$1.trim();
        effect(() => node.textContent = this.data[name])
      }
    }
    // 访问元素节点上的属性
    if (node.nodeType === Node.ELEMENT_NODE) {
      let _attributes = node.attributes;
      for (let attr of _attributes) {
        if (attr.name === "v\-model") {
          let value = attr.value;
          // console.log('value', value)
          effect(() => (node.value = this.data[value]));
          node.addEventListener("input", () => (this.data[value] = node.value));
        }
        // v-bind 与 缩写：
        if(attr.name.match(/^v\-bind:([\s\S]+)$/) || attr.name.match(/^\:([\s\S]+)$/)) {
          let attrName = RegExp.$1.trim();
          effect(() => node.setAttribute(attrName, this.data[attr.value]))
        }
        // v-on
        if(attr.name.match(/^v\-on:([\s\S]+)$/) || attr.name.match(/^@([\s\S]+)$/)) {
          let eventName = RegExp.$1.trim();
          let fnName = attr.value;
          node.addEventListener(eventName, this[fnName]);
        }
      }
    }

    if (node.childNodes && node.childNodes.length) {
      for (let child of node.childNodes) {
        this.traversal(child);
      }
    }
  }
}

// 定义effect为Map对象
let effects = new Map();
let currentEffect = null;
function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

const reactive = (object) => {
  const observed = new Proxy(object, {
    get(target, key) {
      // 我们在get中做依赖收集
      if(currentEffect) {
        // 判断是否这个值
        if(!effects.has(target)) 
          effects.set(target, new Map());
          
        if(!effects.get(target)?.get(key))
          effects.get(target).set(key, new Array())
        // 先写实现逻辑
        effects.get(target).get(key).push(currentEffect);
      }
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      // target[key] = value;
      Reflect.set(target, key, value);
      let _effects = effects?.get(target)?.get(key);
      if(_effects) {
        for(let effect of _effects) {
          effect();
        }
      }
      return value;
    }
  })

  return observed;
}
