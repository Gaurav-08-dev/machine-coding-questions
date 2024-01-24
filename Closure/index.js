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
  for (var i = 1; i < 6; i++) {
    function close(i) {
      setTimeout(() => {
        console.log(i);
      }, i * 1000);
    }
    close(i);
  }
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
    console.log(x)
  };

  this.decrement = () => {
    x--;
    console.log(x)
  };
}

const c3 = new count();

c3.increment()
c3.decrement()




