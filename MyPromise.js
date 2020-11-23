class FeiPromise {
    static Status = {
        Pending: 'pending',
        Resolved: 'resolved',
        Rejected: 'rejected',
    };
    status = FeiPromise.Status.Pending;
    callbacks = [];
    errorHandlers = [];
    value;
    error;

    constructor(initFunc) {
        if (typeof initFunc === 'function') {
            try {
                initFunc(this.resolve.bind(this), this.reject.bind(this));
            } catch (error) {
                this.reject(error);
            }
        }
    }

    resolve(value) {
        this.status = FeiPromise.Status.Resolved;
        this.value = value;
        if (this.callbacks.length) {
            this.executeCallbacks();
        }
    }

    reject(error) {
        console.log('reject....');
        this.status = FeiPromise.Status.Rejected;
        this.error = error;
        if (this.callbacks.length) {
            this.executeCallbacks();
        }
    }

    then(successCallback, failureCallback) {
        const feiPromise = new FeiPromise();
        this.callbacks.push({
            successCallback,
            failureCallback,
            resolve: feiPromise.resolve.bind(feiPromise),
            reject: feiPromise.reject.bind(feiPromise),
        });

        if (this.status !== FeiPromise.Status.Pending) {
            this.executeCallbacks();
        }
        return feiPromise;
    }

    executeCallbacks() {
        for (const { successCallback, failureCallback, resolve, reject } of this
            .callbacks) {
            setTimeout(() => {
                try {
                    if (this.status === FeiPromise.Status.Resolved) {
                        if (typeof successCallback === 'function') {
                            try {
                                resolve(successCallback(this.value));
                            } catch (error) {
                                reject(error);
                            }
                        }
                    } else {
                        if (typeof failureCallback === 'function') {
                            failureCallback(this.error);
                        }
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }
    }

    catch(errorHandler) {
        const feiPromise = new FeiPromise();

        this.errorHandlers.push({
            errorHandler,
            resolve: feiPromise.resolve.bind(feiPromise),
        });
        setTimeout(() => {
            console.log('catch: ' + this.status);
            if (this.status === FeiPromise.Status.Rejected) {
                (this.errorHandlers || []).forEach(
                    ({ errorHandler, resolve }) => {
                        resolve(errorHandler(this.error));
                    }
                );
            }
        });

        return feiPromise;
    }

    static resolve(value) {
        return new FeiPromise((resolve, reject) => {
            resolve(value);
        });
    }

    static reject(error) {
        return new FeiPromise((resolve, reject) => {
            reject(error);
        });
    }

    static race() {}

    static all(promises) {}
}

var p = new FeiPromise((resolve, reject) => {
    setTimeout(() => {
        reject(12345);
    }, 500);
});
p.then(
    (d) => {
        console.log('corrected!' + d);
    },
    (e) => {
        console.log('rejected!' + e);
    }
);

var p = new FeiPromise((resolve, reject) => {
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

FeiPromise.resolve(1)
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

var p = new FeiPromise((res, rej) => {
    res('xx');
})
    .then(() => {
        console.log(cccc);
    })
    .catch((e) => console.log(e));

var p = new FeiPromise((res, rej) => {
    rej('xx');
})
    .then(
        () => {},
        () => {
            console.log(bbbb);
        }
    )
    .catch((e) => console.log(e));
