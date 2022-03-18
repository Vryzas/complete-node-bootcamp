const fs = require("fs");
const server = require("http").createServer(); // less code to create the server 👆🏻

server.on("request", (req, res) => {
  //solution1
  fs.readFile("test-file.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.end(data);
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening....");
});
