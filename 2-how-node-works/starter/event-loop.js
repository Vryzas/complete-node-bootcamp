const fs = require(`fs`);
const crypto = require(`crypto`);

const start = Date.now();
// setting the number of threads
process.env.UV_THREADPOOL_SIZE = 4;
// expires after 0 secs
setTimeout(() => console.log(`Timer 1 finished`), 0);
// expires immediately
setImmediate(() => console.log(`Immediate 1 finished`));
// callback fn
fs.readFile("test-file.txt", () => {
  // I/O callback
  console.log(`I/O finished`);
  console.log(`---------------------------------------------`);
  // expired timer callback
  setTimeout(() => console.log(`Timer 2 finished`), 0);
  // 3 sec timer
  setTimeout(() => console.log(`Timer 3 finished`), 3000);
  // setImmediate callback
  setImmediate(() => console.log(`Immediate 2 finished`));
  process.nextTick(() => console.log(`Process.nextTick`));
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 1 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 2 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 3 encrypted");
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password 4 encrypted");
});
// top level code
console.log(`Hello from the top level code!`);
