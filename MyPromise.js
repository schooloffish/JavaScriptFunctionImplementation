class MyPromise {
    static Status = {
        Pending: 'pending',
        Resolved: 'resolved',
        Rejected: 'rejected',
    };
    status = MyPromise.Status.Pending;
    successCallbacks = [];
    failureCallbacks = [];
    value;
    error;

    constructor(initFunc) {
        typeof initFunc === 'function' &&
            initFunc(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        this.status = MyPromise.Status.Resolved;
        this.value = value;
        if (this.successCallbacks.length) {
            this.executeSuccessCallbacks();
        }
    }

    reject(error) {
        this.status = MyPromise.Status.Rejected;
        this.error = error;
    }

    then(successCallback, failureCallback) {
        const myPromise = new MyPromise();
        this.successCallbacks.push({
            successCallback,
            resolve: myPromise.resolve.bind(myPromise),
        });
        if (this.status === MyPromise.Status.Resolved) {
            this.executeSuccessCallbacks();
        }
        return myPromise;
    }

    executeSuccessCallbacks() {
        for (const { successCallback, resolve } of this.successCallbacks) {
            setTimeout(() => {
                resolve
                    ? resolve(successCallback(this.value))
                    : successCallback(this.value);
            }, 100);
        }
    }

    catch(catchFunc) {
        this.failureCallbacks.push(catchFunc);
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value);
        });
    }

    static reject() {}
}

var p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(12345);
    }, 500);
});

p.then((value) => console.log(value));
p.then((value) => console.log(value));
p.then((value) => {
    console.log(value);
    return 789;
}).then((v) => {
    console.log(v);
});

MyPromise.resolve(1)
    .then((v) => {
        console.log(v);
        return 2;
    })
    .then((v) => {
        console.log(v);
        return 3;
    })
    .then((v) => console.log(v))
    .then((v) => console.log(v));
