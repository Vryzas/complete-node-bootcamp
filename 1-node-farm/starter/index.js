// require 'file system'
const fs = require("fs");

// file reading
const textIn = fs.readFileSync("./txt/input.txt", `utf-8`);
console.log(textIn);
// file writting
const textOut = `This what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/input.txt", textOut);
console.log(`Text written!`);
