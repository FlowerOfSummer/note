// 模拟红绿灯：红灯3s，绿灯2s，黄灯1s，如此循环
// TODO 请在这里编写代码
function sleep(time, col) {
   return new Promise((resolve) => {
        setTimeout(() => {
            console.log(col)
            resolve()
        }, time)
    })
}
async function ligh() {
    console.log('红灯')
    while(1) {
        await sleep(3000, '绿灯')
        await sleep(2000, '黄灯')
        await sleep(1000, '红灯')
    }
}
ligh()