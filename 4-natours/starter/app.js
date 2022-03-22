const fs = require('fs');
const express = require('express');

const app = express();
// middleware for POST
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// getting one particular tour with url params
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    tour,
  });
});

//can use the same URL to get or post
app.post('/api/v1/tours', (req, res) => {
  // new id (sequencial)
  const newId = tours[tours.length - 1].id + 1;
  // new tour obj
  const newTour = Object.assign({ id: newId }, req.body);
  // push yhe new obj to the array
  tours.push(newTour);
  // (over)write the new data array into the 'DB' (json file)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // server response
      res.status(201).json({
        status: 'sucess',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
