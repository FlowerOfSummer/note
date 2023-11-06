// https://mp.weixin.qq.com/s/0NyTyV4aRgffD6pss-0vag
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function MyPromise(executor) {
  const _this = this;
  this.state = PENDING;
  this.reason = undefined;
  this.val = undefined;
  this.resovleFuns = [];
  this.rejectFuns = [];
  function resove(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.val = value;
      this.resovleFuns.forEach((fn) => fn(value));
    }
  }
  function reject(reason) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.reason = reason;
      this.rejectFuns.forEach((fn) => fn(reason));
    }
  }
  executor();
}
MyPromise.prototype.then = (onFulfilled, onRejected) => {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (val) => val;
  onRejected = typeof onRejected === "function" ? onRejected : (reason) => reason;
  let promise2 = new MyPromise((resove, reject) => {
    if (this.state === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(this.value);
          resovePromise(x, promise2, resove, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    } else if (this.state === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(this.reason);
          resovePromise(x, promise2, resove, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    } else if (this.state === PENDING) {
      this.resovleFuns.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resovePromise(x, promise2, resove, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
      this.rejectFuns.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.reason);
            resovePromise(x, promise2, resove, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      });
    }
  });
  return promise2;
};
function resovePromise(x, promise2, resove, reject) {
  if (x === promise2) {
    reject(new TypeError("TypeError: Chaining cycle detected for promise #<Promise>"));
  }
  let called = null;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then();
      if (typeof then === "function") {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resovePromise(y, promise2, resove, reject);
        });
      } else {
        if (called) return;
        called = true;
        resove(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resove(x);
  }
}
Promise.all = (list) => {
  return new Promise((resolve, reject) => {
    let resValues = [];
    let counts = 0;
    for (let [i, p] of list) {
      p.then(
        (res) => {
          counts++;
          resValues[i] = res;
          if (counts === list.length) {
            resolve(resValues);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};
Promise.all = function (promises) {
  let list = [];
  let count = 0;
  function handle(i, data, resolve) {
    list[i] = data;
    count++;
    if (count == promises.length) {
      resolve(list);
    }
  }
  return Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        (res) => {
          handle(i, res, resolve);
        },
        (err) => reject(err)
      );
    }
  });
};

Promise.any = function (promises) {
  const res = [];
  if (promises.length === 0) resolve(res);
  const count = 0;
  return new Promise().then(() => {
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          conut++;
          res[i] = err;
          if (count === promises.length) {
            reject(new AggregateError(res));
          }
        });
    }
  });
};

Promise.allSettled = function (promises) {
  const result = [];
  return new Promise((resolve) => {
    if (promises.length === 0) resolve(result);
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((res) => {
          result[i] = { status: "fulfilled", value: res };
          if(result.length === promises.length) {
            resolve(result);
          }
        })
        .catch((err) => {
          result[i] = { status: "rejected", reason: err };
          if(result.length === promises.length) {
            resolve(result);
          }
        });
    }
  });
};
Promise.race = function (promises) {};
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    for (let i = 0; i < len; i += 1) {
      const promise = promises[i];
      // 这里使用 Promise.resolve 包了一下，以防传递了 non-promise
      Promise.resolve(promise).then(res => {
        resolve(res);
      }, error => {
        reject(error);     
      });
    }
  });
}