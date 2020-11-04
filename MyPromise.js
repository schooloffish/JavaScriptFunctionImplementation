class MyPromise {
    status = 'pending';
    thenArray = [];
    catchArray = [];
    value;
    error;

    constructor(initFunc) {
        const resolve = (value)=> {
            this.status = 'resolved';
            this.value = value;
            if (this.thenArray.length) {
                this.executeThenArray();
            }
        };
        const reject = (error)=> {
            this.status = 'rejected';
            this.error = error;
            for (const iterator of this.catchArray) {
                setTimeout(()=>{
                    iterator(this.error);
                }, 100);    
            }
        };
        initFunc(resolve, reject);
    }

    then(thenFunc) {
        this.thenArray.push(thenFunc);
        if (this.status === 'resolved') {
            this.executeThenArray();
        }
    }
    
    executeThenArray() {
        for (const iterator of this.thenArray) {
            setTimeout(()=>{
                iterator(this.value);
            }, 100);    
        }
        this.thenArray.length = 0;
    }

    catch(catchFunc) {
        this.catchArray.push(catchFunc);
    }

    static resolve() {

    }

    static reject() {

    }
}

var p = new MyPromise((resolve, reject)=>{
    setTimeout(() => {
        resolve(12345);
    }, 5000);
});

p.then((value)=>console.log(value));
p.then((value)=>console.log(value));
