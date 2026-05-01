const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.postMessage(100000000000);

worker.on("message", (e) => {
  console.log("Result", e);
});
