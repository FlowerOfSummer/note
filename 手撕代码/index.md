####  1.冒泡排序

* 冒泡排序的思路：遍历数组，然后将最大数沉到最底部；
* 时间复杂度：O(N^2)；
* 空间复杂度：O(1)

```js
function BubbleSort(arr) {
  if(arr===null || arr.length<=0) {
    return [];
  }
  for(let len = arr.length-1;len>0;len--) {
    for(let i=0;i<len;i++) {
      if(arr[i] > arr[i+1]) {
        swap(arr, i, i+1);
      }
    }
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
```

#### 2.选择排序

* 选择排序的实现思路：遍历数组，把最小数放在头部；
* 时间复杂度：O(N^2)；
* 空间复杂度：O(1)

```js
function selectSort(arr) {
  if(arr===null || arr.length<=0) {
    return [];
  }
  for(let i=0;i<arr.length;i++) {
    let minIndex = i;
    for(let j=i+1;j<arr.length;j++) {
      minIndex = arr[i] < arr[j] ? i : j;
    }
    swap(arr, i, minIndex);
  }
}
function swap(arr, i, j) {
  if(i===j) {
    return ;
  }
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
} 
```

#### 3.插入排序

* 插入排序实现思路：将一个新的数，和前面的比较，只要当前数小于前一个则和前一个交换位置，否则终止；
* 时间复杂度：O(N^2)；
* 空间复杂度：O(1)

```js
function insertSort(arr) {
  if(arr===null || arr.length<=0) {
    return [];
  }
  for(let i=1;i<arr.length;i++) {
    for(let j=i-1;j>0;j--) {
      if(arr[j] > arr[j+1]) {
        swap(arr, j, j+1)
      }
    }
  }
}
```

#### 4.快速排序

* 快速排序实现思路：随机取出一个值进行划分，大于该值放右边，小于该值放左边（该算法在经典快排的基础上经过荷兰国旗思想和随机思想进行了改造）
* 时间复杂度：O(N*logN)
* 空间复杂度：O(logN)

```js
function quickSort(arr) {
  if(arr.length<=1) {
    return arr;
  }
  let num = arr[0];
  let left = [];
  let right = [];
  for(let i=1;i<arr.length;i++) {
    if(arr[i]<num) {
      left.push(arr[i])
    } else{
      right.push(arr[i])
    }
  }
  return [...quickSort(left),num,...quickSort(right)]
}

```

#### 5.全排列
```js
function getAll (string) {
  const map = new Map()
  let res = []

  function dfs(path) {
    if(path.length === string.length) {
      res.push(path)
      return
    }
    for(let i=0;i<string.length;i++) {
      if(map.get(string[i])) continue
      map.set(string[i], true)
      path += string[i]
      dfs(path)
      path = path.substring(0, path.length-1)
      map.set(string[i], false)
    }
  }
  dfs('')
  return res
}

```

#### instanceof
```js
function myInstanceof (target, Fn) {
  if(typeof target !== 'object' || typeof target !== 'function' || target === null  ) return false
  let proto = target.__proto__
  while(true) {
    if(proto === null) return false
    if(proto === Fn.prototype) return true
    proto = proto.__proto__
  }
}

```

### 实现map
```js
Array.prototype._map = function(exc) {
  const res = []
  this.forEach((item, index, arr) => {
    res[index] = exc(item, index, arr)
  })
  return res
}
```

### 实现filter
```js
Array.prototype._filter = function(exc) {
  const res = []
  this.forEach((item, index, arr) => {
    if(exc(item, index, arr)) {
      res.push(item)
    }
  })
  return res
}
```

### reduce
```js

Array.prototype._reduce = function (exc, initial = 0) {
  let res = initial
  this.forEach((item, index, arr) => {
    res = exc(res, item)
  })
  return res
}
```

### Object.creat
```js
Object.prototype._creat = function (proto) {
  const Fn = function () {}
  Fn.prototype = proto
  return new Fn()
}

```
