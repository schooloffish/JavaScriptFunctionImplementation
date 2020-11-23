Function.prototype.feiBind = function (target, ...args1) {
    if (typeof target !== 'object') {
        throw new Error('target is not an object');
    }
    const fn = this;
    // unique Symbol to avoid override
    const key = Symbol.for('key');
    target[key] = fn;
    return function (...args2) {
        const args3 = args1.length ? args1 : args2;
        const result = target[key](...args3);
        delete target[key];
        return result;
    };
};

function plusAll(a, b, c) {
    const d = this.base + a + b + c;
    return d;
}

var fn1 = plusAll.feiBind({ base: 10 }, 1, 2, 3);
var fn11 = plusAll.bind({ base: 10 }, 1, 2, 3);
console.log(fn1() === fn11());

var fn2 = plusAll.feiBind({ base: 10 });
var fn22 = plusAll.bind({ base: 10 });
console.log(fn2(4, 5, 6) === fn22(4, 5, 6));

var fn3 = plusAll.feiBind({ base: 10 }, 7, 8, 9);
var fn33 = plusAll.bind({ base: 10 }, 7, 8, 9);
console.log(fn3(10, 11, 12) === fn33(10, 11, 12));
