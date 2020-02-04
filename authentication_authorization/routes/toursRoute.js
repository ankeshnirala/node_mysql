const express   = require('express');
const router    = express.Router();
const toursControllers = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

router.route('/tour')
      .get(authController.protect, authController.restrictTo('admin', 'user', 'guide', 'lead-guide'), toursControllers.listTours)
      .post(authController.protect, authController.restrictTo('admin'), toursControllers.addTour);

router.route('/tour/:id')
      .get(authController.protect, authController.restrictTo('admin', 'user', 'guide', 'lead-guide'),  toursControllers.viewTour)
      .patch(authController.protect, authController.restrictTo('admin'), toursControllers.updateTour)
      .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), toursControllers.deleteTour);

module.exports = router;