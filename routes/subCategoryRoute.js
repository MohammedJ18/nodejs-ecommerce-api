const express = require("express");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");
const { createSubCategory,
        getSubCategories,
        getSubCategory,
        updateSubCategory,
        deleteSubCategory,
        setCategoryIdToBody,
        createFilterObj,
} = require("../services/subCategoryService");
const router = express.Router({ mergeParams: true});
router
  .route("/")
  .get(createFilterObj, getSubCategories)
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory);
router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
