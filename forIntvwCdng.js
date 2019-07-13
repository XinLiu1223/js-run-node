// Complete the sockMerchant function below.
function sockMerchant(n, ar) {
  let temp = {};
  temp = ar.reduce(function(rv, x) {
    (rv[x] = rv[x] || []).push(x);
    return rv;
  }, {});
  let result = 0;
  Object.keys(temp).map(tmpKy => {
    if (temp[tmpKy].length >= 2) {
      result += parseInt(temp[tmpKy].length / 2);
    }
  });
  return result;
}

console.log(
  sockMerchant(18, [8, 8, 8, 8, 8, 8, 5, 1, 2, 3, 3, 3, 3, 6, 6, 6, 6, 6])
);

// let a = 0;
// a = 1 % 3;
// console.log(a);
(function() {
  var foo = 1;

  function bar() {
    var foo = 2;
  }

  bar();

  console.log(foo); //outputs? 2

  if (true) {
    var foo = 3;
  }

  console.log(foo); //outputs? 3
})();

// class Inheritance
class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  hello() {
    return "name: " + this.name + ", color: " + this.color;
  }
}

class Cat extends Animal {
  constructor(name, color, action) {
    super(name, color);
    this.action = action;
  }

  hello() {
    return super.hello() + ", say: " + this.action;
  }
}

const cat = new Cat("sunny", "white", "meow");
console.log(cat.hello());

let state = [];
const courseObjA = { title: "A" };
const courseObjB = { title: "B" };
const newStateA = [...state, { ...courseObjA }];
console.log("test spread add obj to array: " + newStateA[0].title);
const newStateB = [...newStateA, { ...courseObjB }];
console.log("test spread add obj to array: " + newStateB[0].title);
console.log("test spread add obj to array: " + newStateB[1].title);

// spread means spread and copy, the same with the followings
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1 = [...arr2, ...arr1];

// test some recursive function
const factorial = n => {
  if (n === 0) return 1;
  else return n * factorial(n - 1);
};

const recursResult = factorial(4);
console.log("the recursive: " + recursResult);
