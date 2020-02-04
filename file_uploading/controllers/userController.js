const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.listUser = catchAsync(async (req, res, next)=> {
    let users =  await User.findAll();

    res.status(200).json({
        status: 'Success',
        data: users[0]
    });
});