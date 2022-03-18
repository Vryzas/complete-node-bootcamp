// module.exports
const C = require("./test-module-1");
const calc = new C();
console.log(calc.add(3, 2));
console.log(calc.multiply(3, 2));
console.log(calc.divide(10, 2));
