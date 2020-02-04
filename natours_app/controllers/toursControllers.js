const Tour = require("./../models/toursModel");
const catchAsync = require("./../utils/catchAsync");

exports.listTours = catchAsync(async (req, res, next) => {

  let tour = await Tour.findAll(req.query);

  res.status(200).json({
    status: "Success!!",
    data: tour[0]
  });
  
});

exports.addTour = catchAsync(async (req, res, next) => {
  let tour = await new Tour({
    tour_name: req.body.tour_name,
    duration: req.body.duration,
    price: req.body.price,
    rating: req.body.rating,
    max_group_size: req.body.max_group_size,
    summary: req.body.summary,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status
  });

  let tourCreated = await Tour.save(tour);

  res.status(200).json({
    status: "Added Successfully!!",
    data: tourCreated[0]
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
  let tour = {
    tour_name: req.body.tour_name,
    duration: req.body.duration,
    price: req.body.price,
    rating: req.body.rating,
    max_group_size: req.body.max_group_size,
    summary: req.body.summary,
    description: req.body.description,
    image: req.body.image,
    status: req.body.status
  };

  let tourUpdated = await Tour.updateById(tour, req.params.id);

  res.status(200).json({
    status: "Updated Successfully!!",
    data: tourUpdated[0]
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  let tourDeleted = await Tour.deleteById(req.params.id);

  res.status(200).json({
    status: "Deleted Successfully!!",
    data: tourDeleted[0]
  });
});
