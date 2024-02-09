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
  {f:'z',l:'d',a:1},
  {f:'q',p:'g',a:2},
  {f:'p',o:'n',a:3},
  {f:'x',y:'m',a:4},
]


// console.log(users.reduce((acc,curr)=>{
//   if(curr.a < 4){
//     acc.push(curr.f)
//   }

//   return acc;
// },[]))