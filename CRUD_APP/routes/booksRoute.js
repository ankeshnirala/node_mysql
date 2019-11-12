const express   = require('express');
const Router    = express.Router();
const booksController = require('./../controllers/booksController');

Router.route('/').post(booksController.getAllBook)
Router.route('/addNewBook').post(booksController.addNewBook);
Router.route('/updateBook').post(booksController.updateBook);
Router.route('/deleteBook').post(booksController.deleteBook);
Router.route('/viewBook').post(booksController.viewBook);

module.exports = Router;