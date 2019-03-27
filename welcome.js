// const welcomeToVScode = () => {
//     console.log(helloWorld());
// };

// const helloWorld = () => (
//     'Hello World'
// );

// welcomeToVScode();

// Array No duplicated elements
const noDuplicate = (arr) => {
  let result = [];
  let i, j, lng = arr.length;
  for(i = 0; i < lng; i++) {
    for(j = i + 1; j < lng; j++) {
      if(arr[i] === arr[j]) {
        j = ++i;
      }
    }
    result.push(arr[i]);
  }
  return result;
};

const testArr = [3, 1, 2, 1, 2, 5, 5, 6, 6, 1];
console.log(noDuplicate(testArr));


const x = {
  val: 2
};

const x1 = x => Object.assign({}, x, { val: x.val + 1});

const x2 = x => Object.assign({}, x, { val: x.val * 2});

console.log(x1(x2(x)).val); // 5


const y = {
  val: 3
};

// Since there are no dependencies on outside variables,
// we don't need different functions to operate on different
// variables.

// this space intentionally left blank

// Because the functions don't mutate, you can call these
// functions as many times as you want, in any order, 
// without changing the result of other function calls.
x2(y);
x1(y);

console.log(x1(x2(y)).val); // 5


// function.call/apply 
const obj = { name: 'Xin' };

const greet = function(a, b) {
  return 'welcome ' + this.name + ' to ' + a + ' in ' + b;
};

// arrow function will not work because it bind this
/*
const greet = (a, b) => {
  return 'welcome ' + this.name + ' to ' + a + ' in ' + b;
};
*/

console.log(greet.call(obj, 'Charlotte', 'NC'));

const objA =  { name: 'Xin Liu' };
const arrA = ['Charlotte', 'NC'];
console.log(greet.apply(objA, arrA));


const cylinder = {
  pi: 3.14,
  volume: function(r, h) {
    return this.pi * r * r * h;
  }
};

console.log(cylinder.volume.call({ pi: 3.14156 }, 2, 6));
console.log(cylinder.volume.apply({ pi: 3.14156 }, [2, 6]));


// callback
function callFunc(callback, name) {
  callback(name);
};

// const sayHello = function(name) {
//   console.log(name + ' says Hello');
// };

// callFunc(sayHello, 'Xin');
callFunc(function(name) {
  console.log(name + ' says Hello');
}, 'Xin');
// const callFunc = function(callback, name) {
//   callback(name);
// };


// callback by this - global obj, no param pass in callback
GlobalObj.prototype.callFuncA = function(callback) {
  callback(this.nameA);
};

function GlobalObj() {
  this.nameA = 'Xin Liu';
}

// const sayHello = function(name) {
//   console.log(name + ' says Hello');
// };

const globalObj = new GlobalObj();

// globalObj.callFuncA(sayHello);
globalObj.callFuncA(function(name) {
  console.log(name + ' says Hello');
});

// ES6 Class
class GlobalObjA {
  constructor(name) {
    // super();
    this.nameA = name;
  }
  callFuncA(callback) {
    callback(this.nameA);
  };
}

const globalObjA = new GlobalObjA('Mr. Xin Liu');

globalObjA.callFuncA(function(name) {
  console.log(name + ' says Hello');
});


// the following is my thought of how array Map callback implemented
// which is correct, the code is from
// https://gist.github.com/alexhawkins/28aaf610a3e76d8b8264

// the important is to use this and prototype
// this binds the array

/*****************NATIVE forEACH*********************/

Array.prototype.myEach = function(callback) {
  for (var i = 0; i < this.length; i++)
      callback(this[i], i, this); // arrayItem, index, arrayItself
};

var arr = ['biggy smalls', 'bif tannin', 'boo radley', 'hans gruber'];
arr.myEach(function(word) {
  console.log(word);
});

/*****************NATIVE MAP*************************/

Array.prototype.myMap = function(callback) {
  arr = [];
  for (var i = 0; i < this.length; i++)
      arr.push(callback(this[i], i, this)); // arrayItem, index, arrayItself
  return arr;
};

var arrs = ['dic tanin', 'boo radley', 'hans gruber'];
var numbers2 = [1, 4, 9];

var goodT = arrs.myMap(function(n) {
  return n;
});

var squareRoot = numbers2.myMap(function(num) {
  return Math.sqrt(num);
});

console.log(goodT);
console.log(squareRoot);


/*****************NATIVE REDUCE*************************/


Array.prototype.myReduce = function(callback, initialVal) {
  var accumulator = initialVal ? initialVal : undefined;
  for (var i = 0; i < this.length; i++) {
      if (accumulator !== undefined)
          accumulator = callback.call(undefined, accumulator, this[i], i, this);
      else
          accumulator = this[i]; // it is to assign the First Item value of array to accum
  }
  return accumulator;
};

//tests
var numbers3 = [20, 20, 2, 3];
var total = numbers3.myReduce(function(a, b) {
  return a + b;
}, 10);
console.log(total); // 55

var flattened = [
  [0, 1],
  [2, 3],
  [4, 5]
].myReduce(function(a, b) {
  return a.concat(b);
});
console.log(flattened); //[ 0, 1, 2, 3, 4, 5 ]
