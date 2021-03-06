Function.prototype.feiCall = function (target, ...args) {
    if (typeof target !== 'object') {
        throw new Error('not an object');
    }
    const key = Symbol.for('key');
    target[key] = this;
    const result = target[key](...args);
    delete target.fn;
    return result;
};

function plusAll(a, b, c) {
    const d = this.base + a + b + c;
    return d;
}

var a1 = plusAll.feiCall({ base: 10 }, 2, 3, 4);
var a2 = plusAll.call({ base: 10 }, 2, 3, 4);
