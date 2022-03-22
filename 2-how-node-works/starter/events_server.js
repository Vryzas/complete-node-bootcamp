const http = require(`http`);
const sales = require("./events_sales");

const server = http.createServer();

server.on(`request`, (req, res) => {
  console.log(`Request received!`);
  res.end(`Request received!`);
});

server.on(`request`, (req, res) => {
  console.log(`Another request!!`);
});

server.on(`close`, (req, res) => {
  console.log(`Server closed!`);
});

server.listen(8000, `127.0.0.1`, () => {
  console.log(`Waiting for requests.....`);
});
