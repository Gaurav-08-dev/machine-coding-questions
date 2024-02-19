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
//
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

// console.log(printName.myCall(person, "Hey"));

// ! apply
Function.prototype.myApply = function (context, args) {
  let currentContext = context || globalThis;
  let uniqueProp = Symbol();

  currentContext[uniqueProp] = this;

  let result = currentContext[uniqueProp](...args);
  delete currentContext[uniqueProp];
  return result;
};

// console.log(printName.apply(person, ["hey", "haan Bhai", "p"]));

// ! bind
Function.prototype.myBind = function (...args) {
  let callback = this;
  passedArgs = args.slice(1);

  return function (...a) {
    return callback.apply(args[0], passedArgs.concat(a));
  };
};

const bindedFunc = printName.myBind(person, "hi");
// console.log(bindedFunc("hi"));

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

// console.log(findNodeValue());

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

// console.log(flatUsingReduce(multiArray));

// ! Flatten Object

const obj = {
  A: "12",
  B: 23,
  C: {
    P: 23,
    O: {
      L: 56,
    },
    Q: [1, 2],
  },
};

const flattenObject = (obj, parent) => {
  const output = {};

  const generateFlatObject = (obj, parent) => {
    for (let key in obj) {
      const newParent = parent + key;
      const val = obj[key];

      if (typeof val === "object") {
        generateFlatObject(val, newParent + ".");
      } else {
        output[newParent] = val;
      }
    }
  };

  generateFlatObject(obj, parent);
  return output;
};

// console.log(flattenObject(obj, ""));

// ! Promise.all polyfill

const p1 = new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("P1 success"), 1000);
  //   setTimeout(() => reject("P1 fail"), 1000);
});
const p2 = new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("P2 success"), 3000);
  // setTimeout(() => reject("P2 fail"), 3000);
});
const p3 = new Promise((resolve, reject) => {
  //   setTimeout(() => resolve("P3 success"), 2000);
  // setTimeout(() => reject("P3 fail"), 2000);
});

Promise.myAll = function (args) {
  return new Promise((resolve, reject) => {
    const output = [];
    let total = 0;
    args.forEach((promise, index) => {
      promise
        .then((data) => {
          output[index] = data;
          total += 1;
          if (total === args.length) resolve(output);
        })
        .catch((err) => reject(err));
    });
  });
};

// Promise.myAll([p1, p2, p3])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

// ! Create a curry function that accepts 5 arguments

const ARGS_LEN = 5;

const sum = (...args) => {
  if (args.length === ARGS_LEN)
    return args.reduce((initialVal, currentVal) => initialVal + currentVal, 0);
  else {
    const recursiveFn = (...args2) => {
      args = args.concat(args2);
      if (args.length === ARGS_LEN) {
        return args.reduce(
          (initialVal, currentVal) => initialVal + currentVal,
          0
        );
      } else {
        return recursiveFn;
      }
    };
    return recursiveFn;
  }
};

// console.log(sum(1, 2, 3, 4, 5));
// console.log(sum(1, 2, 3, 4)(5));
// console.log(sum(1)(2)(3)(4)(5));
// console.log(sum(1, 2, 3)(4, 5));
// console.log(sum(1, 2)(3, 4, 5));
// console.log(sum(1)(2, 3, 4, 5));

// ! curry function that returns sum of previous values

const prevSumCurry = () => {
  let sum = 0;
  return function (args) {
    return (sum = sum + args);
  };
};

const sums = prevSumCurry();
// console.log(sums(1));
// console.log(sums(1));
// console.log(sums(5));

// ! polyfill of split

String.prototype.customSplit = function (delimiter) {
  let output = [];

  if (delimiter === "") return Array.from(this);

  const startSplit = (str, i) => {
    if (i >= this.length) return;

    const index = str.indexOf(delimiter);
    if (index >= 0) {
      output.push(str.substring(0, index));
      startSplit(
        str.substring(index + delimiter.length),
        index + delimiter.length
      );
    } else {
      output.push(str);
    }
  };
  startSplit(this, 0);

  return output;
};

// console.log("  gau rav jfsdk jk ravldsfj sdl ".customSplit(""));

// ! OUTPUT BASED QUESTIONS FOR PROMISES

// * Q1 will it work twice?
// var p = new Promise((resolve,reject) => {
//     reject(Error("It failed"))
// })

// p.catch(e => console.log(e.message))
// p.catch(e => console.log(e.message))

// * Q2
// var q= new Promise((resolve,reject)=> {
//     reject(Error("The failure"))
// }).catch(err => console.log(err.message))
// .then(err => console.log(err))

// * Q3

// new Promise((resolve, reject) => {
//   resolve("It works");
// })
//   .then(() => {
//     throw Error("Oh wait !! it doesnt");
//   })
//   .catch((err) => {
//     return "LOL!! Actually it does work";
//   })
//   .then((message) => console.log(message));

// * Q4

// Promise.resolve("Success!!")
//   .then((data) => {
//     return data.toUpperCase();
//   })
//   .then((data) => console.log(data));

// * Q5

// Promise.resolve("success")
//   .then(() => {
//     throw Error("Oh noooooooo");
//   })
//   .catch((err) => {
//     return "actually it worked";
//   })
//   .then((data) => {
//     throw new Error("It Failed");
//   })
//   .catch((err) => console.log(err.message));

// * Q6

// const promise = new Promise((res) => res(2));
// promise
//   .then((v) => {
//     console.log(v);
//     return v * 2;
//   })
//   .then((v) => {
//     console.log(v);
//     return v * 2;
//   })
//   .finally((v) => {
//     console.log(v, "finally");
//     return v * 2;
//   })
//   .then((v) => {
//     console.log(v);
//   });

// ! this keyword

function User() {
  (this.name = "Gaurav Singh"), (this.score = 20);

  this.sayUser = function () {
    console.log(this.name);

    innerFunction = () => {
      console.log(this.name);
    };

    innerFunction();
  };
}

let name = new User();
name.sayUser();

// ! Task Schedulling

const schedules = [
  { id: "a", dependencies: ["b", "c"] },
  { id: "b", dependencies: ["d"] }, // ! d
  { id: "c", dependencies: ["e"] },
  { id: "d", dependencies: [] },
  { id: "e", dependencies: ["f"] }, // ! f
  { id: "f", dependencies: [] },
];

const totalTasks = schedules.length;
let totalTasksExecuted = 0;
let currentTask = 0;

const removeTaskFromDependencies = (taskId) => {
  schedules.forEach((task) => {
    const taskIndex = task.dependencies.indexOf(taskId);
    if (taskIndex !== -1) {
      task.dependencies.splice(taskIndex, 1);
    }
  });
};
const executeTasks = () => {
  while (totalTasksExecuted < totalTasks) {
    const task = schedules[currentTask];

    if (!task.dependencies.length && !task.executed) {
      console.log("Running Task", task.id);
      task.executed = true;
      totalTasksExecuted += 1;
      removeTaskFromDependencies(task.id);
    } else if (!task.visited) task.visited = 1;
    else if (task.visited > totalTasks) {
      console.log("Cycle Formed");
      break;
    } else task.visited += 1;

    if (currentTask === totalTasks - 1) currentTask = 0;
    else currentTask += 1;
  }
};

// executeTasks()

// ! Polyfill for SetTimeout

function createSetTimeout() {
  let timerId = 1;
  let timerMap = {};

  function mySetTimeout(callback, delay, ...args) {
    let id = timerId++;
    timerMap[id] = true;

    const start = Date.now();

    function triggerCallback() {
      if (!timerMap[id]) return;

      if (Date.now() > start + delay) {
        callback.apply(this, args);
      } else {
        requestIdleCallback(triggerCallback);
      }
    }
    requestIdleCallback(triggerCallback);
    return id;
  }

  function myClearTimeout(id) {
    delete timerMap[id];
  }

  return { mySetTimeout, myClearTimeout };
}

// let timer = mySetTimeout((name)=>{console.log("Test",name)}, 1000,"Gaurav")

// ! SetInterval polyfill
let { mySetTimeout, myClearTimeout } = createSetTimeout();

function createSetInterval() {
  let timerId = 1;
  let timerMap = {};
  let { mySetTimeout, myClearTimeout } = createSetTimeout();

  function mySetInterval(callback, delay, ...args) {
    let id = timerId++;

    function triggerCallback() {
      timerMap[id] = mySetTimeout(function () {
        callback(this, args);
        if (timerMap[id]) triggerCallback();
      }, delay);
    }

    triggerCallback();
    return id;
  }

  function myClearInterval(id) {
    myClearTimeout(id);
    delete timerMap[id];
  }

  return { mySetInterval, myClearInterval };
}

let { mySetInterval, myClearInterval } = createSetInterval();

console.log("Start");
let count = 0;
// let timer = mySetInterval(() => {
//   console.log("Now");
//   count++;
//   if (count >= 2) myClearInterval(timer);
// }, 1000);
console.log("End");



