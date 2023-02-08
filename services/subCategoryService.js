const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};
// @desc   Get all subCategories
// @route  GET /api/v1/subcategories
// @access Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc   Get single subCategory
// @route  GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc   Create a subCategory
// @route  POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc   Update a subCategory
// @route  PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc   Delete a subCategory
// @route  DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
