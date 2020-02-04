const passwordHash = require('bcryptjs');
const User = require("./../models/usersModel");
const catchAsync = require("./../utils/catchAsync");

exports.listUsers = catchAsync(async (req, res, next) => {
  let users = await User.findAll();

  res.status(200).json({
    status: "Success!!",
    data: users[0]
  });
});

exports.getUserByEmail = catchAsync(async (req, res, next) => {
  let user = await User.findOne(req.body.email);

  res.status(200).json({
    status: "Success!!",
    data: user[0]
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  
  let user = await new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    mobile: req.body.mobile,
    password: await passwordHash.hash(req.body.password, passwordHash.genSaltSync(10)),
    status: req.body.status
  });

  let userCreated = await User.save(user);

  res.status(200).json({
    status: "Success!!",
    users: userCreated[0]
  });
});

exports.viewUser = catchAsync(async (req, res, next) => {
  let userView = await User.findById(req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: userView[0]
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {

        let allKeys = ""; 
        allValues = []; 
         var keys = Object.keys(req.body); 
         for (let index in keys) { 
             allKeys += (keys[index] + "= ? ,"); 
             allValues.push(req.body[keys[index]]); 
         } 
         allKeys = allKeys.slice(0, -1); 

  let userUpdated = await User.updateById(allValues, allKeys, req.params.id);

  res.status(200).json({
    status: "Successfully updated!!",
    data: userUpdated
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  let userDeleted = await User.deleteById(req.params.id);

  res.status(200).json({
    status: "Successfully deleted!!",
    data: userDeleted[0]
  });
});