const User = require('./../models/usersModel');

exports.createNewUser = async (req, res, next) => {
    
    const newUser = new User(req.body);
    
    if(!newUser.username || !newUser.password){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid details!'
        });
    }else{
        await User.createUser(newUser)
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

exports.getAllUsers = async (req, res, next) => {

    await User.getUser()
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

exports.updateUser  = async (req, res, next) => {
    const newUser = new User(req.body);
    
    if(!newUser.id){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid id and valid details!'
        });
    }else{
        await User.updateUser(newUser, req.body.id)
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

exports.deleteUser  = async (req, res, next) => {
    
    if(!req.body.id){
        res.status(400).json({
            status: 'Failed!',
            message: 'Please provide valid id!'
        });
    }else{
       await User.deleteUser(req.body.id)
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