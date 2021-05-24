## 编写overflow-tooltip公共组件

### 前期准备
* 了解项目，调研组件常用场景。
* vue + element中的el-tooltip
* angular +  NG-ZORRO 中的nz-tooltip
### 思想历程
* 内容溢出判断，直接上css(被pass)---css只能做一行溢出显示...，不能多行（-webkit-line-clamp存在兼容问题，只能是webkit内核才能用，必须结合display:  -webkit-box;来用）。而且不能判断是否显示tooltip
* 获取父级元素的宽，和自己内容的宽做比较。能判断是否显示tooltip，但默认显示多行时，不行。
* 通过传入lineheight和几行，判断高度。嗯嗯嗯，，得结合css，操作后也是不可取。
* 从内容下手，截取字符串（基本脱离css,不存在兼容问题）。
* 获取到父级元素的宽
    * 将内容拿出来创建一个span标签来获取offsetWidth
    * 将字符串进行遍历，计算像素。结合dome。
    * 截取我们需要的字符串，溢出必须加'...'
    * 使用直接传属性就行，默认el-tooltip的属性加了部分常用属性（需要也可以传进来）。
> 注意：加了...后截取的字符串宽度会增加，需要减回去。span最后要记得删除掉。
### 主要方法实现
```js
/**
 * 
 * @summary 截取显示字符串及是否显示tooltip
 * @param String content 传入的内容
 * @param Number parentWidth  父级元素的宽度
 * @param Number rowSpan 传入的默认显示行数
 * @return Boolean flag 用于判断是否显示tooltip
 * @return String substr 截取后的字符串，用于界面渲染内容
 */
getStr(content, parentWidth, rowSpan) {
    let span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.display = 'inline-block';
    span.style.wordBreak = 'break-all !important';
    span.setAttribute('class', 'fontSize');
    document.body.appendChild(span);
    let strWidth = span.offsetWidth;
    let substr = content;
    let flag = false;
    for (let  i = 0; i < content.length; i++) {
    span.innerHTML = content[i];
    strWidth += span.offsetWidth;
    if (strWidth > parentWidth * rowSpan) {
        flag = true;
        span.innerHTML = '...';
        strWidth += span.offsetWidth;
        while (strWidth > parentWidth * rowSpan) {
        i--;
        span.innerHTML = content[i];
        strWidth -= span.offsetWidth;
        }
        substr = content.substring(0, i);
        break;
    }
    }
    if (flag) {
    substr = substr + '...';
    }
    document.getElementsByTagName('body')[0].removeChild(span);
    return { 
    substr,
    flag
    };
}
```

### vue
#### 实现
```html
<template>
  <div>
    <el-tooltip 
      ref="elTootip"
      :placement="placement"
      :disabled="disabled"
      :content="content"
      :effect="effect"
    >
      <span class="content">
        {{ contentStr }}
      </span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: 'Top'
    },
    placement: {
      type: String,
      default: 'top'
    },
    effect: {
      type: String,
      default: 'light'
    },
    rowSpan: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      disabled: true,
      parentWidth: 100,
      contentStr: ''
    };
  },
  mounted() {
    this.showTooltip();
  },
  methods: {
    showTooltip() {
      this.parentWidth = this.$refs['elTootip'].$parent.$el.offsetWidth;
      this.contentStr = this.getStr(this.content, this.parentWidth, this.rowSpan).substr;
      this.disabled = !this.getStr(this.content, this.parentWidth, this.rowSpan).flag;
    }
    getStr() {
        // 见上
    }
  }
}
</script>>
<style lang="less" scoped>
.content {
  word-break: break-all;
}
</style>
```
#### 使用
```html
<div style="height: 100px;">
    <overflowTooltip content="content" placement="top" row-span=2/>
</div>
```
### angular
#### 实现
> **overflow-tooltip.component.html**
```html
<p class="content"
  [nz-tooltip]="disabled ? null : content"
  >
  {{contentStr}}
</p>
```
> **overflow-tooltip.component.ts**
```js
import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'overflow-tooltip',
  templateUrl: './overflow-tooltip.component.html',
  styleUrls: ['./overflow-tooltip.component.less']
})
export class OverflowTootipComponent implements OnInit {
  @Input() content = '';
  @Input() tooltipPlacement = 'top';
  @Input() rowSpan = 1;

  public disabled: boolean;
  public parentWidth: number;
  public contentStr: string ;
  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    this.showTooltip();
  }
  showTooltip() {
    this.parentWidth = this.el.nativeElement.parentNode.offsetWidth;
    this.contentStr = this.getStr(this.content, this.parentWidth, this.rowSpan).substr;
    this.disabled = !this.getStr(this.content, this.parentWidth, this.rowSpan).flag;
  }
}
```
> **overflow-tooltip.component.less**
```css
.content {
    word-break: break-all;
}
```
#### 使用
```html
<div style="width:100px">
    <overflow-tooltip content='content' tooltipPlacement='top' rowSpan=2></overflow-tooltip>
</div>
```


### 总结收获
* 在项目中抽离公共组件，熟悉了项目结构。
* 在工作中，很多通用的地方能传参就不用if。
* 了解angular公共组件库代码结构，再次熟悉了angular的语法。
* 在共公组件库有了贡献（小兴奋），期待下一次有更好的输出。
* 在编写公共组件前，先设计好我们需要传些什么参数，提高组件的可扩展性。
