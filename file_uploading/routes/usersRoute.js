const express = require('express');
const Router = express.Router();
const userController = require('./../controllers/userController');

Router.route('/').get(userController.listUser);

module.exports = Router;