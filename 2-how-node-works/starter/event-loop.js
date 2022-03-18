const fs = require(`fs`);
const crypto = require(`crypto`);

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4; // setting the number of threads

setTimeout(() => console.log(`Timer 1 finished`), 0); // expires after 0 secs
setImmediate(() => console.log(`Immediate 1 finished`)); // expires immediately
fs.readFile("test-file.txt", () => {
  console.log(`I/O finished`); // I/O callback
  console.log(`---------------------------------------------`);
  setTimeout(() => console.log(`Timer 2 finished`), 0); // expired timer callback
  setTimeout(() => console.log(`Timer 3 finished`), 3000); // 3 sec timer
  setImmediate(() => console.log(`Immediate 2 finished`)); // setImmediate callback

  process.nextTick(() => console.log(`Process.nextTick`));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 1 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 2 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 3 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 4 encrypted");
}); // callback fn
console.log(`Hello from the top level code!`); // top level code
