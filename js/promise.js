const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function MyPromise(executor) {
  const _this = this;
  this.state = PENDING;
  this.reason = undefined;
  this.val = undefined;
  this.resovleFuns = [];
  this.rejectFuns = [];
  function resove (value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.val = value;
      this.resovleFuns.forEach(fn => fn(value))
    }
  }
  function reject (reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.reason = reason;
      this.rejectFuns.forEach(fn => fn(reason))
    }
  }
  executor();
}
MyPromise.prototype.then = (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => reason;
  let promise2 = new MyPromise((resove, reject) => {
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value);
          resovePromise(x, promise2, resove, reject);
        } catch(e) {
          reject(e)
        }
      }, 0);
    } else if(this.state === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resovePromise(x, promise2, resove, reject);
        } catch(e) {
          reject(e)
        }
      }, 0);
    } else if (this.state === PENDING) {
      this.resovleFuns.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resovePromise(x, promise2, resove, reject);
          } catch(e) {
            reject(e)
          }
        }, 0); 
      })
      this.rejectFuns.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.reason);
            resovePromise(x, promise2, resove, reject);
          } catch(e) {
            reject(e)
          }
        }, 0);
      })
    }
  }) 
  return promise2;
}
function resovePromise(x, promise2, resove, reject) {
  if (x === promise2) {
    reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  let called = null;
  if ((x typeof 'object' && x !== null) || (x typeof 'function')) {
    try {
      let then = x.then();
        if (then typeof 'function') {
          then.call(x, y=> {
            if(called)  return;
            called = true;
            resovePromise(y, promise2, resove, reject)
          })
        } else {
          if(called)  return;
          called = true;
          resove(x)
        }
    } catch(e) {
      if(called)  return;
      called = true;
      reject(e)
    }
  } else {
    resove(x)
  }
}
Promise.all = function (promises) {
  let list = []
  let count = 0
  function handle(i, data) {
    list[i] = data
    count++
    if (count == promises.length) {
      resolve(list)
    }
  }
  return Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(res => {
        handle(i, res)
      }, err => reject(err))
    }
  })
}