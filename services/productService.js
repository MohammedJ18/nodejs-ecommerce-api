const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc   Get all products
// @route  GET /api/v1/products
// @access Public
exports.getProducts = factory.getAll(Product, { path: "category", select: "name" });
// @desc   Get single product
// @route  GET /api/v1/products/:id
// @access Public
exports.getProduct = factory.getOne(Product, { path: "category", select: "name" });

// @desc   Create a product
// @route  POST /api/v1/products
// @access Private
exports.createProduct = factory.createOne(Product);

// @desc   Update a product
// @route  PUT /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product);

// @desc   Delete a product
// @route  DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = factory.deleteOne(Product);