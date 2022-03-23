const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();
router.route('/').get(tourController.getAllTours).post(tourController.postTour);

router.param('id', (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  next();
});

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
