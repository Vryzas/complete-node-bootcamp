const fs = require("fs");
const server = require("http").createServer(); // less code to create the server 👆🏻

server.on("request", (req, res) => {
  // solution 3 : Pipe Operator
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // needs_a_readable_source.pipe(writable_destination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening....");
});
