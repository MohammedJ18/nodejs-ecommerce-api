const factory = require("./handlersFactory");
const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// @desc   Get all users
// @route  GET /api/v1/users
// @access Private
exports.getUsers = factory.getAll(User);

// @desc   Get single user
// @route  GET /api/v1/users/:id
// @access Private
exports.getUser = factory.getOne(User);

// @desc   Create a user
// @route  POST /api/v1/users
// @access Private
exports.createUser = factory.createOne(User);

// @desc   Update a user
// @route  PUT /api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      email: req.body.email,
      role: req.body.role,
      profileImage: req.body.profileImage,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError("Document not found", 404));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    { password: await bcrypt.hash(req.body.password, 12) },
    { new: true }
  );
  if (!document) {
    return next(new ApiError("Document not found", 404));
  }
  res.status(200).json({ data: document });
});
// @desc   Delete a user
// @route  DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
