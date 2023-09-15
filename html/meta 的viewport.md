## meta viewport 是做什么用的，怎么写？
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
```
- 目的 是为了在移动端不让用户缩放页面使用的

- 解释每个单词的含义
    - `with=device-width` 将布局视窗（layout viewport）的宽度设置为`设备屏幕分辨率`的宽度
    - `initial-scale=1` 页面`初始缩放比例为`屏幕分辨率的宽度
    - `maximum-scale=1` 指定用户能够`放大`的最大比例
    - `minimum-scale=1` 指定用户能够`缩小`的最大比例
