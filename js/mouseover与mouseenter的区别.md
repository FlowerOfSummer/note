#### 区别
* mouseover 和 mouseenter在没有子元素的时候，功能是一样的。
* 在存在子元素的时候，mouseover受冒泡事件的影响，会先触发子元素的mouseover，此时拿到的target是子元素，而不是我们期望的元素。mouseenter就不存在这个问题。