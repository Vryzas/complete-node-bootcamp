const fs = require("fs");
const server = require("http").createServer(); // less code to create the server 👆🏻

server.on("request", (req, res) => {
  //solution 2 : Streams
  const readable = fs.createReadStream("test-file.txt");
  // reads the file piece by piece
  readable.on("data", (chunk) => {
    res.write(chunk);
  });
  // very important to use!!!
  readable.on("end", () => {
    res.end();
  });

  readable.on("error", (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  });
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening....");
});
