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

// ! Currying using bind method

let multiply = function (x, y) {
  return x * y;
};

let multiplyBy2 = multiply.bind(this, 2);
console.log(multiplyBy2(4));

// ! Currying using closure

let multiplyClosure = function (x) {
  return function (y) {
    return x * y;
  };
};

console.log(multiplyClosure(2)(0))


// ! Infinite Currying
let sum = function(a){
    return function (b) {

        if(b) return sum(a+b);
        return a;
    }
}

console.log(sum(1)(2)(3)(4)())