// In JavaScript, a primitive (primitive value, primitive data type) is data that is not an object and has no methods.
// There are 6 primitive data types: string, number, bigint, boolean, undefined, and symbol.
// A primitive can be replaced, but it can't be directly altered.

function feiInstanceOf(left, right) {
    const rightType = typeof right;
    if (!['function', 'object'].includes(rightType)) {
        throw new Error('right side of "feiInstanceOf" is not an object');
    }

    if (!right.prototype) {
        throw new Error('Right-hand side of "instanceof" is not callable');
    }

    // if left is primitive type, return false
    const leftType = typeof left;
    const isPrimitive = [
        'string',
        'number',
        'boolean',
        'symbol',
        'bigint',
        'undefined'
    ].includes(leftType);
    if (isPrimitive) {
        return false;
    }

    let leftProto = Object.getPrototypeOf(left);
    while (leftProto !== null) {
        if (leftProto === right.prototype) {
            return true;
        }
        leftProto = Object.getPrototypeOf(leftProto);
    }

    return false;
}

console.log(feiInstanceOf({}, Object) === {} instanceof Object);
console.log(feiInstanceOf('', String) === '' instanceof String);
console.log(feiInstanceOf(1, Number) === 1 instanceof Number);
console.log(feiInstanceOf(1, String) === 1 instanceof String);
console.log(feiInstanceOf('', Number) === '' instanceof Number);
console.log(
    feiInstanceOf(Symbol.for('test'), Symbol) ===
        Symbol.for('test') instanceof Symbol
);
console.log(feiInstanceOf(1n, BigInt) === 1n instanceof BigInt);
console.log(feiInstanceOf(true, Boolean) === true instanceof Boolean);
class A {}
var a = new A();
console.log(feiInstanceOf(a, A) === a instanceof A);
class B extends A {}
var b = new B();
console.log(feiInstanceOf(b, A) === b instanceof A);
class C extends B {}
var c = new C();
console.log(feiInstanceOf(c, A) === c instanceof A);
console.log(feiInstanceOf(c, B) === c instanceof B);
