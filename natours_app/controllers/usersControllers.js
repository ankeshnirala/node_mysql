const User = require("./../models/usersModel");
const catchAsync = require("./../utils/catchAsync");

exports.listUsers = catchAsync(async (req, res, next) => {
  let users = await User.findAll();

  res.status(200).json({
    status: "Success!!",
    data: users[0]
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  let user = await new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password, 
    email: req.body.email,
    status: req.body.status
  });

  let userCreated = await User.save(user);

  res.status(200).json({
    status: "Success!!",
    data: userCreated[0]
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
  let user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    status: req.body.status
  };

  let userUpdated = await User.updateById(user, req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: userUpdated
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  let userDeleted = await User.deleteById(req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: userDeleted[0]
  });
});
