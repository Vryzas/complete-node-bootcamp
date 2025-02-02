// module.exports
const C = require("./test-module-1");
const calc = new C();
console.log(calc.add(5, 5));
console.log(calc.multiply(5, 2));
console.log(calc.divide(10, 1));

// exports
const { add, multiply, divide } = require("./test-module-2");
console.log(add(1, 1));
console.log(multiply(1, 2));
console.log(divide(10, 5));

// caching
// loads the module only once and caches it
require(`./test-module-3`)();
require(`./test-module-3`)();
require(`./test-module-3`)();
