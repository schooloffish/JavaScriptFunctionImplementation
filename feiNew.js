function feiNew(fn, ...args) {
    var obj = Object.create(fn.prototype);
    var result = fn.apply(obj, args);
    if (typeof result === 'object') {
        return result
    } else {
        return obj;
    }
}