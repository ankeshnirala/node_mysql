const Book = require('./../models/booksModel');

exports.addNewBook = async (req, res) => {
    const newBook = new Book(req.body);
    
    if(!newBook){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid book details!'
        });
    }else{
        await Book.saveBook(newBook)
            .then((result) =>  {
                res.status(200).json({
                    status: 'Success!',
                    data: result[0]
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'Failed!',
                    message: 'Something went wrong!',
                    error: err
                });
            });
    }
}

exports.getAllBook = async (req, res) => {

    await Book.fetchAllBook()
        .then((result) =>  {
            res.status(200).json({
                status: 'Success!',
                data: result[0]
            });
        })
        .catch((err) => {
            res.status(400).json({
                status: 'Failed!',
                message: 'Something went wrong!',
                error: err
            });
        });
}

exports.viewBook  = async (req, res) => {
    
    if(!req.body.id){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid id!'
        });
    }else{
        await Book.fetchBookById(req.body.id)
            .then((result) =>  {
                res.status(200).json({
                    status: 'Success!',
                    data: result[0]
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'Failed!',
                    message: 'Something went wrong!',
                    error: err
                });
            });
    }
}

exports.updateBook  = async (req, res) => {
    const newBook = new User(req.body);
    
    if(!newBook.id){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid id and valid details!'
        });
    }else{
        await Book.updateBookById(newBook, req.body.id)
            .then((result) =>  {
                res.status(200).json({
                    status: 'Success!',
                    data: result[0]
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'Failed!',
                    message: 'Something went wrong!',
                    error: err
                });
            });
    }
}

exports.deleteBook  = async (req, res) => {
    
    if(!req.body.id){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid id!'
        });
    }else{
       await Book.deleteBookById(req.body.id)
            .then((result) =>  {
                res.status(200).json({
                    status: 'Success!',
                    data: result[0]
                });
            })
            .catch((err) => {
                res.status(400).json({
                    status: 'Failed!',
                    message: 'Something went wrong!',
                    error: err
                });
            });
    }
}