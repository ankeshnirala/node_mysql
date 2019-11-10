const express   = require('express');
const Router    = express.Router();
const usersController = require('./../controllers/usersController');

Router.route('/').post(usersController.getAllUsers).post(usersController.createNewUser);
Router.route('/updateUser').post(usersController.updateUser);
Router.route('/deleteUser').post(usersController.deleteUser);

module.exports = Router;