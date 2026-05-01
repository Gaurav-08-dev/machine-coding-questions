const {parentPort} = require("worker_threads")

parentPort.on('message',(e) => {
    console.log("inside worker", e)
  const n = e;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += i;
  }
  console.log(sum)

  parentPort.postMessage(sum);
});
