const mongoose = require("mongoose");
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sub Category name is required"],
      trim: true,
      maxlength: [32, "Sub Category name cannot exceed 32 characters"],
      minlength: [2, "Sub Category name must be at least 2 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Sub Category must belong to a Category"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SubCategory", subCategorySchema);