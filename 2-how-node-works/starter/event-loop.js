const fs = require(`fs`);

setTimeout(() => console.log(`Timer 1 finished`), 0); // expires after 0 secs
setImmediate(() => console.log(`Immediate 1 finished`)); // expires immediately
fs.readFile("test-file.txt", () => {
  console.log(`I/O finished`); // I/O callback
  console.log(`---------------------------------------------`);
  setTimeout(() => console.log(`Timer 2 finished`), 0); // expired timer callback
  setTimeout(() => console.log(`Timer 3 finished`), 3000); // 3 sec timer
  setImmediate(() => console.log(`Immediate 2 finished`)); // setImmediate callback

  process.nextTick(() => console.log(`Process.nextTick`));
}); // callback fn
console.log(`Hello from the top level code!`); // top level code
