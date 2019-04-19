// const welcomeToVScode = () => {
//     console.log(helloWorld());
// };

// const helloWorld = () => (
//     'Hello World'
// );

// welcomeToVScode();

// Array No duplicated elements
const noDuplicate = arr => {
  let result = [];
  let i,
    j,
    lng = arr.length;
  for (i = 0; i < lng; i++) {
    for (j = i + 1; j < lng; j++) {
      if (arr[i] === arr[j]) {
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

const x1 = x => Object.assign({}, x, { val: x.val + 1 });

const x2 = x => Object.assign({}, x, { val: x.val * 2 });

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
const obj = { name: "Xin" };

const greet = function(a, b) {
  return "welcome " + this.name + " to " + a + " in " + b;
};

// arrow function will not work because it bind this
/*
const greet = (a, b) => {
  return 'welcome ' + this.name + ' to ' + a + ' in ' + b;
};
*/

console.log(greet.call(obj, "Charlotte", "NC"));

const objA = { name: "Xin Liu" };
const arrA = ["Charlotte", "NC"];
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
// function callFunc(callback, name) {
//   callback(name);
// }
const callFunc = (callback, name) => {
  callback(name);
};

// const sayHello = function(name) {
//   console.log(name + ' says Hello');
// };
// const sayHello = (name) => {
//   console.log(name + ' says Hello');
// };

// callFunc(sayHello, 'Xin');

callFunc(name => {
  console.log(name + " says Hello");
}, "Xin");

// callback by this - global obj, no param pass in callback
GlobalObjA.prototype.callFuncA = function(callback) {
  callback(this.nameA);
};

function GlobalObjA(name) {
  this.nameA = name;
}

const globalObjA = new GlobalObjA("Xin Liu");

// const sayHello = function(name) {
//   console.log(name + ' says Hello');
// };
// const sayHello = (name) => {
//   console.log(name + ' says Hello');
// };

// globalObj.callFuncA(sayHello);

globalObjA.callFuncA(name => {
  console.log(name + " says Hello");
});

// ES6 Class
class GlobalObjB {
  constructor(name) {
    // super();
    this.nameB = name;
  }
  callFuncB(callback) {
    callback(this.nameB);
  }
}

const globalObjB = new GlobalObjB("Mr. Xin Liu");

globalObjB.callFuncB(name => {
  console.log(name + " says Hello");
});

// react HOC is used to pass in some additional common function, which
// is the callback fucntion, and call them in react HOC,
// that means the react HOC is basically to implement the function to accept
// the callback function as a passin param, which is similar to the
// callFunc, callFuncA, callFuncB shown above
/*

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);


function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

*/

// the following is my thought of how array Map callback implemented
// which is correct, the code is from
// https://gist.github.com/alexhawkins/28aaf610a3e76d8b8264

// the important is to use this and prototype
// this binds the array

/*****************NATIVE forEACH*********************/

Array.prototype.myEach = function(callback) {
  for (var i = 0; i < this.length; i++) callback(this[i], i, this); // arrayItem, index, arrayItself
};

var arr = ["biggy smalls", "bif tannin", "boo radley", "hans gruber"];
arr.myEach(function(word) {
  console.log(word);
});

/*****************NATIVE MAP*************************/

Array.prototype.myMap = function(callback) {
  arr = [];
  for (var i = 0; i < this.length; i++) arr.push(callback(this[i], i, this)); // arrayItem, index, arrayItself
  return arr;
};

var arrs = ["dic tanin", "boo radley", "hans gruber"];
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
    else accumulator = this[i]; // it is to assign the First Item value of array to accum
  }
  return accumulator;
};

//tests
var numbers3 = [20, 20, 2, 3];
var total = numbers3.myReduce(function(a, b) {
  return a + b;
}, 10);
console.log(total); // 55

var flattened = [[0, 1], [2, 3], [4, 5]].myReduce(function(a, b) {
  return a.concat(b);
});
console.log(flattened); //[ 0, 1, 2, 3, 4, 5 ]

// the following will begin on node
const events = require("events");
const util = require("util");

const Person = function(name) {
  this.name = name;
};

// this line is the important inheritance oop
// so can use the properties of parent class
// in this example is the on, emit of EventEmitter
util.inherits(Person, events.EventEmitter);

const xiaoming = new Person("xiaoming");
const lili = new Person("lili");
const xin = new Person("xin");

const persons = [xiaoming, lili, xin];

// this is the curry function
// need to check the relationship between
// curry function and closure

/**
  // this is not related to the curry or closure
  // it's 2 callbacks forEach pass in the (person)=>
  // first callback, then in person.on pass in the (message)=>
  // second callback
  persons.forEach((person) => {
    person.on('speak', (message) => {
      console.log(person.name + ' said: ' + message);
    });
  });
*/

// curry plus setting a private variable = closure
// add private variables in curry function = closure
const speak = (first, last) => {
  const parent = "beautiful";
  const clo = () => `${first} ${parent} ${last}`;
  return clo();
};
speak("Hello", "World");
console.log(speak("Hello", "World"));
// returns Hello beautiful World

// so change the person.forEach to closure is as followings
persons.forEach(person => {
  const parentText = "curry func add seting private = closure";
  const clo = () => {
    person.on("speak", () => {
      console.log(person.name + " said: " + `${parentText}`);
    });
  };
  return clo();
});
// more importantly，closure is to return an executing
// function inside the outer function,
// it's the same with doing serial api calls chaining
// in axios .then，which is to return the callback of
// the chaining serial next api call in .then method

// the above analyze is not that exactly
// so, closure means the inner function can access the variable
// inside the outter function, and return an executed function
// to make the variable inside the outter function to be private
// but the curry function just returns a function, not
// return an executed function

/**

axios
  .get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p1')
  .then(response => {
    this.setState({ p1Location: response.data });
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p2');
  })
  .then(response => {
    this.setState({ p2Location: response.data });
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.props.p3');
  })
  .then(response => {
    this.setState({ p3Location: response.data });
  }).catch(error => console.log(error.response));

*/

xin.emit("speak");

// we can call a curry function in 2 ways:
// 1. directly call curry(a, b) as the below xin.emit('x', 'a');
// 2. const a = curry(a); which will return the inner func
// then call  a(b);
// 3. curry(a)(b);
/**
  xin.emit('speak', 'I will make a curry function');
*/
// where is my curry function ?

const myEmitter = new events.EventEmitter();

myEmitter.on("someEvent", message => {
  console.log(message);
});

myEmitter.emit("someEvent", "test events");

// read file I/O Async
const fs = require("fs");

// readFile is Async
const readMe = fs.readFile("README.md", "utf8", (err, data) => {
  // will console log undefined because of async not getting data yet
  console.log("Below is the readFile data: \n" + data);
  // if (data !== undefined) {
  //   console.log(data);
  // }
});

console.log(readMe);
console.log(
  "it is just the main thread execution finished \n" +
    "not the real Async readFile getting data finished"
);

// the callback hell ?
fs.mkdir("stuff", () => {
  fs.readFile("README.md", (err, data) => {
    fs.writeFile("./stuff/writeMe.txt", data, () => {
      console.log("write file success");
    });
  });
});

// pipe stream
const myReadStrm = fs.createReadStream(__dirname + "/README.md"); // , 'utf8' without utf8 will output buffer
myReadStrm.setEncoding("utf8");

let data = "";

// data is the node built in event
myReadStrm.on("data", chunk => {
  data += chunk;
});

// end is the node built in event
myReadStrm.on("end", () => {
  console.log("Below is the pipe Stream data: \n" + data);
});

// write Stream
const myWriteStrm = fs.createWriteStream(__dirname + "/writeMe.txt");

let writeDate = "Hello World";
myWriteStrm.write(writeDate, "utf8");
myWriteStrm.end();
// finish is the node built in event
myWriteStrm.on("finish", () => {
  console.log("write stream success");
});

// using pipe
// myReadStrm.pipe(myWriteStrm);

// json test
const testObj = {
  name: "Xin",
  job: "Developer"
};

// let jsonStr = JSON.stringify(testObj);
// console.log('json string: ' + jsonStr);

JSON.parse(JSON.stringify(testObj));
// console.log('json obj: ' + jsonObj);
