Function.prototype.feiCall = function (target, ...args) {
    if (typeof target !== 'object') {
        throw new Error('not an object');
    }
    target.fn = this;
    target.fn(...args);
    delete target.fn;
};

function showNameAndCalculateAge(b, c) {
    console.log(`name=${this.name}`);
    console.log(`b+c=${b + c}`);
}

showNameAndCalculateAge.feiCall({ name: 'fei' }, 6, 9);
