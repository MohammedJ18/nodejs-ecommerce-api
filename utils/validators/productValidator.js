const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const SubCategory = require("../../models/subCategoryModel");
const slugify = require("slugify");
// get product validator
exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

// create product validator
exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Product title must be between 3 and 100 characters")
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Product description must be at least 20 characters"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be a number")
    .isLength({ max: 20 })
    .withMessage("Product price cannot be more than 20 characters"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .toFloat()
    .isLength({ max: 20 })
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error(
          "Product price after discount cannot be greater than price"
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid product category id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error("Product category does not exist in the database")
          );
        }
      })
    ),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("Invalid product brand id format"),
  check("subCategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid product sub category id format")
    .custom((subCategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } }).then(
        (subCategories) => {
          console.log(subCategoriesIds.length, subCategories.length);
          if (subCategories.length !== subCategoriesIds.length) {
            return Promise.reject(
              new Error("Product sub category does not exist in the database")
            );
          }
        }
      )
    )
    .custom((subCategoriesIds, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subCategories) => {
          const subCategoriesIdsFromCategory = subCategories.map(
            (subCategory) => subCategory._id.toString()
          );
          const subCategoriesIdsFromRequest = subCategoriesIds.map(
            (subCategoryId) => subCategoryId.toString()
          );
          const result = subCategoriesIdsFromRequest.every((subCategoryId) =>
            subCategoriesIdsFromCategory.includes(subCategoryId)
          );
          if (!result) {
            return Promise.reject(
              new Error(
                "Product sub category does not belong to the selected category"
              )
            );
          }
        }
      )
    ),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product ratings average must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("Product ratings average must be between 1 and 5"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratings quantity must be a number"),
  validatorMiddleware,
];

// update product validator
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  check("title")
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validatorMiddleware,
];

// delete product validator
exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];
