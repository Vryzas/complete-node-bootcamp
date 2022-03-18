// module.exports
const C = require("./test-module-1");
const calc = new C();
console.log(calc.add(5, 5));
console.log(calc.multiply(5, 2));
console.log(calc.divide(10, 1));

// exports
const calc2 = require("./test-module-2");
console.log(calc2.add(1, 1));
console.log(calc2.multiply(1, 2));
console.log(calc2.divide(10, 5));
