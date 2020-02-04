const express   = require('express');
const router    = express.Router();
const usersControllers = require('./../controllers/usersControllers');

// router.route('/login');
router.route('/signup').post(usersControllers.addUser);

router.route('/').get(usersControllers.listUsers).post(usersControllers.addUser);
router.route('/:id').get(usersControllers.viewUser).patch(usersControllers.updateUser).delete(usersControllers.deleteUser);

module.exports = router;