/**
 * 数组转树
 * @param {Array} arr 原始数组
 * @param {String} idKey id 字段名
 * @param {String} parentKey 父级 id 字段名
 * @param {String} childrenKey 子级字段名
 * @returns {Array} 树形结构数组
 */
function arrayToTree(arr, idKey, parentKey, childrenKey) {
  const map = {}; // 创建一个空对象，用于存储每个节点的引用
  const result = []; // 创建一个空数组，用于存储根节点
  for (const item of arr) {
    // 遍历原始数组
    const id = item[idKey]; // 获取当前节点的 id
    const parentId = item[parentKey]; // 获取当前节点的父级 id
    if (!map[id]) {
      // 如果 map 对象中不存在当前节点的引用
      map[id] = { [childrenKey]: [] }; // 在 map 对象中创建当前节点的引用，并添加一个空数组作为子级
    }
    map[id] = { ...item, [childrenKey]: map[id][childrenKey] }; // 将当前节点的信息添加到 map 对象中
    if (parentId === null || parentId === undefined) {
      // 如果当前节点没有父级
      result.push(map[id]); // 将当前节点添加到根节点数组中
    } else {
      // 如果当前节点有父级
      if (!map[parentId]) {
        // 如果 map 对象中不存在当前节点的父级节点的引用
        map[parentId] = { [childrenKey]: [] }; // 在 map 对象中创建当前节点的父级节点的引用，并添加一个空数组作为子级
      }
      map[parentId][childrenKey].push(map[id]); // 将当前节点添加到其父级节点的子级数组中
    }
  }
  return result; // 返回根节点数组
}
