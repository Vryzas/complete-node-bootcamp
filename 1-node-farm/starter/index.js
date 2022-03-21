// run "node index.js" in the terminal (unless u instal nodemon pkg)
// requires node modules
const fs = require("fs");
const http = require(`http`);
const url = require(`url`);
// require 3rd party modules
const slug = require("slugify");
// require my modules
const replaceTemplate = require("./modules/replaceTemplate"); // imports the replaceTemplate fn
const { default: slugify } = require("slugify");
//////////////////////////////////////////////////////////////////////////////////////
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

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs); // could store these in the objects and use them as url query for routing

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
