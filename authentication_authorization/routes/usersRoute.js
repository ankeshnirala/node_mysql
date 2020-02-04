const express   = require('express');
const router    = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.route('/user')
      .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.listUsers)
      .post(authController.protect, authController.restrictTo('admin'), userController.addUser);

router.route('/user/:id')
      .get(authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.viewUser)
      .patch(authController.protect, authController.restrictTo('admin'), userController.updateUser)
      .delete(authController.protect, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;