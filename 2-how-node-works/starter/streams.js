const fs = require("fs");
// less code to create the server 👆🏻
const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 3 : Pipe Operator
  // needs_a_readable_source.pipe(writable_destination)
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening....");
});
