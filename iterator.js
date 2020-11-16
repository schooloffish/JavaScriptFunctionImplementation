// the easiest way
var myIterator1 = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
};
console.log([4,5,6, ...myIterator1]);
for (const i of myIterator1) {
  console.log(i);
}


// offical one
var myIteractor2 = {
  name: 'liu',
  age: 3,
  nationality: 'China'
};

Object.defineProperty(myIteractor2, Symbol.iterator, {
  enumberalbe: false,
  configuralbe: false,
  writable: false,
  value: function () {
    const keys = Object.keys(this);
    const length = keys.length;
    let index = -1;
    return {
      next: ()=>{
        index++;
        console.log(`index, ${index}`);
        return {
          value: this[keys[index]],
          done: index===length
        }
      }
    };
  }
});
console.log([7,8,9,...myIteractor2]);
for (var a of myIteractor2 ) {
    console.log(a);
}
