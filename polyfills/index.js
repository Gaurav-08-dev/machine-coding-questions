// ! Polyfills

// debugger
// var x;
// let y;
// const z=10;

// ! Map
const arr = [1, 22, 3, 65, 89];

Array.prototype.myMap = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i], i));
  }

  return output;
};

// console.log(
//   arr.myMap((item,index) => {
//    return {val:item * 2,index:index}
//   })
// );

// ! Filter

Array.prototype.myFilter = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    if (logic(this[i])) {
      output.push(this[i]);
    }
  }

  return output;
};

// console.log(
//   arr.myFilter((item, index) => {
//     return item % 2 === 0;
//   })
// );

// ! Reduce

Array.prototype.myReduce = function (accumulator, initialVal) {
  let output = initialVal;

  for (let i = 0; i < this.length; i++) {
    output = accumulator(output, this[i], i);
  }

  return output;
};

// console.log(
//   arr.myReduce((acc, curr) =>
//      acc + curr ,
//   0)
// );

// ! Call

let person = {
  firstname: "Gaurav",
  lastname: "Singh",
};

const printName = function (msg, msg2) {
  console.log(msg);
  return `${msg} ${this.firstname} ${this.lastname} ${msg2}`;
};

// console.log( printName.call(person,'HI'))

Function.prototype.myCall = function (context, ...args) {
  let currentContext = context || globalThis;
  let uniqueProp = Symbol();

  currentContext[uniqueProp] = this;

  let result = currentContext[uniqueProp](...args);
  delete currentContext[uniqueProp];

  return result;
};

console.log(printName.myCall(person, "Hey"));

// ! apply
Function.prototype.myApply = function (context, args) {
  let currentContext = context || globalThis;
  let uniqueProp = Symbol();

  currentContext[uniqueProp] = this;

  let result = currentContext[uniqueProp](...args);
  delete currentContext[uniqueProp];
  return result;
};

console.log(printName.apply(person, ["hey", "haan Bhai", "p"]));

// ! bind
Function.prototype.myBind = function (...args) {
  let callback = this;
  passedArgs = args.slice(1);

  return function (...a) {
    return callback.apply(args[0], passedArgs.concat(a));
  };
};

const bindedFunc = printName.myBind(person, "hi");
console.log(bindedFunc("hi"));

// ! Interview QUestion

// ask about corner cases like if values are going to be string only
let user = {
  name: "Gaurav",
  address: {
    personal: {
      city: "New Delhi",
      area: "Dwarka",
    },
    office: {
      city: "Gurgaon",
      area: {
        landmark: "Infosys",
      },
    },
  },
};

let finalObject = {};

let func = (obj, parent, finalObject) => {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      func(obj[key], parent + "_" + key, finalObject);
    } else {
      finalObject[parent + "_" + key] = obj[key];
    }
  }
};

// func(user,'user',finalObject)

// console.log(finalObject)

// ! Debouncing
let counter = 0;
const getData = (item) => {
  counter++;
  console.log("Typing", counter, item);
};

const debounce = (func, delay) => {
  let timer;

  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, ...args);
    }, delay);
  };
};

// const debouncedGetData = debounce(getData,1000)

// ! throttling

const throttle = (func, delay) => {
  let isthrottle;

  return function (args) {
    if (!isthrottle) {
      func.apply(this, [args]);
      isthrottle = true;
      setTimeout(() => (isthrottle = false), delay);
    }
  };
};

// const debouncedGetData = throttle(getData,1000)

// ! Memoized function

const memoize = function (fn) {
  const cache = {};
  return (...args) => {
    const argsToString = JSON.stringify(args);

    if (argsToString in cache) {
      return cache[argsToString];
    } else {
      console.log(`computing value for ${argsToString}`);
      const result = fn.apply(this, args);
      cache[argsToString] = result;
      return result;
    }
  };
};

const addTwoNumbers = (a, b) => {
  return a + b;
};

// console.log(addTwoNumbers(1, 2));

const memoizedAdd = memoize(addTwoNumbers);
// console.log(memoizedAdd(1, 2));

// ! recursive memoize

const factorial = memoize((val) => {
  if (val === 0) return 1;
  return val * factorial(val - 1);
});

// console.log(factorial(6));
// console.log(factorial(5));

// ! DOM Finder

const findPathFromChildToParent = (parent, child) => {
  // debugger
  let currentNode = child;
  const path = [];
  while (currentNode !== parent) {
    const parentElement = currentNode.parentElement;
    const arrayOfChildren = Array.from(parentElement.children);
    path.push(arrayOfChildren.indexOf(currentNode));
    currentNode = parentElement;
  }

  return path;
};

const getValueFromPath = (path, parent) => {
  let currentNode = parent;

  while (path.length) {
    currentNode = currentNode.children[path.pop()];
  }

  return currentNode.innerText;
};

const findNodeValue = () => {
  const rootA = document.getElementById("rootA");
  const rootB = document.getElementById("rootB");
  const nodeA = document.getElementById("nodeA");
  const path = findPathFromChildToParent(rootA, nodeA);
  return getValueFromPath(path, rootB);
};

console.log(findNodeValue());

// ! Flatten an Array

const multiArray = [
  [[1, [1, 1]], 2, 3],
  ["a", 5],
];

const output = [];
const flat = (multiArray) => {
  for (let i = 0; i < multiArray.length; i++) {
    if (Array.isArray(multiArray[i])) {
      flat(multiArray[i]);
    } else {
      output.push(multiArray[i]);
    }
  }
};

// flat(multiArray);

// ! using array.reduce

const flatUsingReduce = function (multiArray) {
  return multiArray.reduce((acc, currentVal) => {
    if (Array.isArray(currentVal)) {
      acc = acc.concat(flatUsingReduce(currentVal));
    } else {
      acc.push(currentVal);
    }

    return acc;
  }, []);
};

console.log(flatUsingReduce(multiArray));
