// closure examples
function outer() {
  var x = 10;
  function inner() {
    var y = 10;
    return function innerinner() {
      console.log(x, y);
    };
  }
  // console.log(y)
  return inner;
}

// outer()()();

// closure interview question
function run() {
  for (let i = 1; i < 6; i++) {
    function close(i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    }
    close(i);
  }
}
// run();

function promisify(number, increase) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(number * 2 + increase), 100)
  );
}

async function double(number, increase) {
  const value = await promisify(number, increase);
  return value;
}

async function run() {
  let result;
  result = await double(5, 0);
  result = await double(10, result);
  result = await double(20, result);
  console.log(result);
}
// run();

//  Data hiding and encapsulation using closure

function counter() {
  var x = 1;

  return function incrementCounter() {
    x++;
    console.log(x);
  };
}

const c1 = counter();
// c1();

// Function constructor
function count() {
  var x = 10;

  this.increment = () => {
    x++;
    console.log(x);
  };

  this.decrement = () => {
    x--;
    console.log(x);
  };
}

const c3 = new count();

// c3.increment();
// c3.decrement();

// for (var a = 1; a <= 3; a++) {
//   (
//          function(index) { setTimeout(function() { console.log(index); }, a * 1000);
//    })(a);
// }

// for (var i = 1; i <= 3; i++) {

//     setTimeout(function() { console.log(i); }, i * 1000) ;
// }

// for (var i = 1, j = 1; i <= 3; i++, j++) {
//   setTimeout(function() { alert(this); }.bind(i), j * 100); }

// ! call method

function isOdd(number) {
  return number % 2;
}

function getOddNumbers() {
  return Array.prototype.filter.call(arguments, isOdd);
}

// console.log(getOddNumbers(1,2,3,4,5,6))

// ! apply method

const person = {
  firstName: "Gaurav",
  lastName: "Singh",
};

function greet(person, message) {
  return `${person}, ${this.firstName},${message}`;
}

// console.log(greet.apply(person, ["aayyye", "oooink"]));

// ! function borrowing using apply method

const computer = {
  name: "hp",
  isOn: false,

  turnOn() {
    this.isOn = true;
    return `${this.name} is On`;
  },

  turnOff() {
    this.isOn = false;
    return `${this.name} is off`;
  },
};

const server = {
  name: "server",
  isOn: false,
};

// console.log(computer.turnOn.apply(server));

// ! Bind method

const module = {
  x: 42,
  getX: function () {
    return this.x;
  },
};

const getxx = module.getX;
// console.log(getxx());
// console.log(getxx.bind(module)());

// ! other test questions

let x = true;
let counts = 0;
setTimeout(() => {
  x = false;
}, 2000);

// while(x){
//   if(x){
//    count++;
//    console.log(count)
//   }
// }

// setTimeout(function () {
//   alert('gorilla');
//   setTimeout(function () {
//     alert('classical inheritance');
//   }, 0);
//   alert('drumroll');
// }, 0);

// alert('banana');

// ! polyfill for map

const arr = [1, 2, 4, 5, 6];

Array.prototype.myMap = function (logic) {
  const output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(logic(this[i]));
  }
  return output;
};

// console.log(
//   arr.myMap((item) => {
//     return item * 2;
//   })
// );

// ! reduce method
// console.log(
//   arr.reduce((acc, counter) => {
//     acc = acc > counter ? acc : counter;
//     return acc;
//   }, 0)
// );

const users = [
  { f: "z", l: "d", a: 1 },
  { f: "q", p: "g", a: 2 },
  { f: "p", o: "n", a: 3 },
  { f: "x", y: "m", a: 4 },
];

// console.log(users.reduce((acc,curr)=>{
//   if(curr.a < 4){
//     acc.push(curr.f)
//   }

//   return acc;
// },[]))

// ! Promise APIs

const p1= new Promise((resolve, reject) => {
  // setTimeout(()=>resolve("P1 success"), 1000)
  setTimeout(()=>reject("P1 fail"), 1000)
})
const p2= new Promise((resolve, reject) => {
  // setTimeout(()=>resolve("P2 success"), 3000)
  setTimeout(()=>reject("P2 fail"), 3000)
})
const p3= new Promise((resolve, reject) => {
  // setTimeout(()=>resolve("P3 success"), 2000)
  setTimeout(()=>reject("P3 fail"), 2000)
})


// Promise.any([p1,p2,p3]).then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
//   console.log(err.errors)
// })

// ! async await

// const p = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Promise resolved")
//   }, 10000);
// })

// const p2 = new Promise((resolve,reject) =>
// setTimeout(() => {
//   resolve("Promise2 resolved")
// }, 20000)
// )

// async function getData(){
//   return "AAyyyeee"
// }

// const data = getData();
// console.log(data)
// data.then(res => console.log(res))

// ! using async await
async function handlePromise() {
  console.log("start");
  const res = await p;
  console.log("res1");
  console.log(res);

  const res2 = await p2;
  console.log("res2");

  console.log(res2);
}

// handlePromise()


// ! Currying using bind method

let multiply = function (x, y) {
  return x * y;
};

let multiplyBy2 = multiply.bind(this, 2);
// console.log(multiplyBy2(4));

// ! Currying using closure

let multiplyClosure = function (x) {
  return function (y) {
    return x * y;
  };
};

// console.log(multiplyClosure(2)(0))


// ! Infinite Currying
let sum = function(a){
    return function (b) {

        if(b) return sum(a+b);
        return a;
    }
}

// console.log(sum(1)(2)(3)(4)())