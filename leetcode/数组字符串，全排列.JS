const unique = (arr1, arr2) => {
    const res = []
    for(let i=0;i<arr1.length;i++) {
        for(let j=0;j<arr2.length;j++) {
            res.push(arr1[i]+arr2[j])
        }
    }
    return res
}
const permuteUnique = (ori, res=[]) => {
    for(let i=0;i<ori.length-1;i++) {
        res = unique(ori[i],ori[i+1])
        ori[i+1] = res
    }
    return res
}