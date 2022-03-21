const EventEmitter = require(`events`);

class Sales extends EventEmitter {}

const myEmitter = new Sales();
// this is a listener
myEmitter.on(`newSale`, () => {
  console.log(`There was a new sale`);
});
// this is a another listener (can have more than 1 for the same event)
myEmitter.on(`newSale`, () => {
  console.log(`Costumer name: Vitor`);
});
// this is a another listener
myEmitter.on(`newSale`, (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

// this is the emitter
myEmitter.emit("newSale", 9);

// exporting as a module
(module.exports = Sales), myEmitter;
