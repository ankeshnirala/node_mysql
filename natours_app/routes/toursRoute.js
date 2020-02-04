const express   = require('express');
const router    = express.Router();
const toursControllers = require('./../controllers/toursControllers');

router.route('/').get(toursControllers.listTours).post(toursControllers.addTour);
router.route('/:id').get(toursControllers.viewTour).patch(toursControllers.updateTour).delete(toursControllers.deleteTour);

module.exports = router;