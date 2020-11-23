Function.prototype.feiApply = function (target, args) {
    if (typeof target !== 'object') {
        throw new Error('not an object');
    }
    // unique Symbol to avoid override
    const key = Symbol.for('key');
    target[key] = this;
    const result = target[key](...args);
    delete target[key];
    return result;
};

function plusAll(a, b, c) {
    const d = this.base + a + b + c;
    return d;
}

const a1 = plusAll.feiApply({ base: 10 }, [2, 3, 4]);
const a2 = plusAll.apply({ base: 10 }, [2, 3, 4]);
console.log(a1 === a2);
