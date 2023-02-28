## Grid 网格布局（二维布局）

### 容器（container）

#### 属性

* display: grid   指定一个容器采用grid布局
* grid-template-columns   定义项目的宽
* grid-template-rows   定义项目的高
* grid-row-gap  设置行间距
* grid-columns-gap  设置列间距
* grid-gap  设置间距（前两者的简写，若省略第二个数，默认等于第一个数）
* grid-template-areas   用于定义区域（某些区域不用，则用`.`表示）
* grid-auto-flow   定义元素填充方向
* justify-items: start | end | center | stretch  设置单元格内容的水平位置
* align-items: start | end | center | stretch;  设置单元格内容的垂直位置
* place-items 前两者的合并
* justify-content: start | end | center | stretch | space-around | space-between | space-evenly 定义容器内整个内容在容器中的水平位置
* align-content: start | end | center | stretch | space-around | space-between | space-evenly
* place-content  前两者的合并

### 项目（item）

* grid-column-start   左边框所在的垂直网格线
* grid-column-end    右边框所在的垂直网格线
* grid-row-start    上边框所在的水平网格线
* grid-row-end    下边框所在的水平网格线
* grid-colum: 1 / span 2
* grid-row
* grid-area: e    指定放在哪个区域
* justify-self   单元格内容的水平位置
* align-self
* place-self
