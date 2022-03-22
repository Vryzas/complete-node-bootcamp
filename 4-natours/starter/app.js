const fs = require('fs');
const express = require('express');

const app = express();
// middleware for POST
app.use(express.json());

// simple example middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // !!!Always invoque next()!!!
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const postTour = (req, res) => {
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
};

const patchTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    tour: '<Updated tour would go here...>',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

app.route('/api/v1/tours').get(getAllTours).post(postTour);

// accessing one particular tour with url params
app.route('/api/v1/tours/:id').get(getTour).patch(patchTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}...`);
});
