const Tour = require("./../models/tourModel");
const catchAsync = require("./../utils/catchAsync");

exports.listTours = catchAsync(async (req, res, next) => {
  let tour = await Tour.findAll();

  res.status(200).json({
    status: "Success!!",
    data: tour[0]
  });
});

exports.addTour = catchAsync(async (req, res, next) => {

  let tour = await new Tour({
    name: req.body.name,
    price: req.body.price,
    duration: req.body.duration,
    group_size: req.body.group_size,
    status: req.body.status
  });

  let userCreated = await Tour.save(tour);

  res.status(200).json({
    status: "Success!!",
    users: userCreated[0]
  });
});

exports.viewTour = catchAsync(async (req, res, next) => {
  let tourView = await Tour.findById(req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: tourView[0]
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {

  let allKeys = "";
  allValues = [];
  var keys = Object.keys(req.body);
  for (let index in keys) {
    allKeys += (keys[index] + "= ? ,");
    allValues.push(req.body[keys[index]]);
  }
  allKeys = allKeys.slice(0, -1);

  let tourUpdated = await Tour.updateById(allValues, allKeys, req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: tourUpdated
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  let tourDeleted = await Tour.deleteById(req.params.id);

  res.status(200).json({
    status: "Success!!",
    data: tourDeleted[0]
  });
});