const mongoose = require("mongoose");

// 1. Create a schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      unique: true,
      minlength: [3, "Brand name must be at least 3 characters"],
      maxlength: [32, "Brand name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

// 2. Create a model
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;
