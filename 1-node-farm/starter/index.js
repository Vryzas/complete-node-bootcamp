// run "node index.js" in the terminal
// require 'file system'
const fs = require("fs");
const http = require(`http`);
const url = require(`url`);

const replaceTemplate = require("./modules/replaceTemplate"); // imports the replaceTemplate fn
//////////////////////////////////////////////////////////////////////////////////////
// // file reading (syncronous or blocking way)
// const textIn = fs.readFileSync("./txt/input.txt", `utf-8`);
// console.log(textIn);
// // file writting (syncronous write)
// const textOut = `This what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/input.txt", textOut);
// console.log(`Text written!`);

// // non-blocking, asynchronous way
// fs.readFile(`./txt/start.txt`, `utf-8`, (err, data1) => {
//   // reads the content of start.txt
//   fs.readFile(`./txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     // reads the file with the name written at start.txt
//     console.log(data2); // reads/shows the content of the file
//     fs.readFile(`./txt/append.txt`, `utf-8`, (err, data3) => {
//       //reads the append.txt
//       console.log(data3); // reads/shows the content in append.txt
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, `utf-8`, (err) => {
//         // writes everything to final.txt
//         console.log(`Your file has been written...`);
//       });
//     });
//   });
// });
// // callback hell example /\
// console.log(`Will read the file!`); // 1st presented
//////////////////////////////////////////////////////////////////////////////////
// SERVER

// executed once so it may be done synchronously
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  `utf-8`
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  `utf-8`
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  `utf-8`
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data); // the data become an array of obj

// server creation
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); // routing args (path & params (if any))

  // routing in the server
  // Overview page
  if (pathname === `/` || pathname === `/overview`) {
    res.writeHead(200, { "Content-type": `text/html` });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    // console.log(cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === `/product`) {
    const product = dataObj[query.id]; // query.id = product id
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === `/api`) {
    res.writeHead(200, { "Content-type": `application/json` });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": `text/html`,
      "my-own-header": `hello-world`,
    });
    res.end(`<h1>Page not Found!</h1>`);
  }
});

// server listening to requests
server.listen(8000, `127.0.0.1`, () => {
  console.log(`Listening to requests on port 8000`);
});
