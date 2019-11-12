const express   = require('express');
const Router    = express.Router();
const usersController = require('./../controllers/usersController');

Router.route('/').post(usersController.getAllUsers);
Router.route('/addNewUser').post(usersController.createNewUser);
Router.route('/updateUser').post(usersController.updateUser);
Router.route('/deleteUser').post(usersController.deleteUser);
Router.route('/viewUser').post(usersController.viewUser);

module.exports = Router;