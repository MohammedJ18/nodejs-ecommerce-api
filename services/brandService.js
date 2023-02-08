const factory = require("./handlersFactory");
const Brand = require("../models/brandModel");

// @desc   Get all brands
// @route  GET /api/v1/brands
// @access Public
exports.getBrands = factory.getAll(Brand);

// @desc   Get single brand
// @route  GET /api/v1/brands/:id
// @access Public
exports.getBrand = factory.getOne(Brand);

// @desc   Create a brand
// @route  POST /api/v1/brands
// @access Private
exports.createBrand = factory.createOne(Brand);

// @desc   Update a brand
// @route  PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = factory.updateOne(Brand);

// @desc   Delete a brand
// @route  DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = factory.deleteOne(Brand);