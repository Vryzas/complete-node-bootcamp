// run "node index.js" in the terminal
// require 'file system'
const fs = require("fs");

// file reading (syncronous or blocking way)
const textIn = fs.readFileSync("./txt/input.txt", `utf-8`);
console.log(textIn);
// file writting (syncronous write)
const textOut = `This what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/input.txt", textOut);
console.log(`Text written!`);

// non-blocking, asynchronous way
fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
  // reads the content of start.txt
  fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
    // reads the file with the name written at start.txt
    console.log(data2); // reads/shows the content of the file
    fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
      //reads the append.txt
      console.log(data3); // reads/shows the content in append.txt
      fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, (err) => {
        // writes everything to final.txt
        console.log(`Your file has been written...`);
      });
    });
  });
});
// callback hell example /\
console.log(`Will read the file!`); // 1st presented
