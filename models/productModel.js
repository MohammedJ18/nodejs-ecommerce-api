const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Product title cannot be more than 100 characters"],
      minlength: [3, "Product title cannot be less than 3 characters"],
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Product description cannot be less than 20 characters"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
      trim: true,
    },
    colors: [String],
    images: [String],
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    subCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  }).populate({
    path: "brand",
    select: "name",
  });
  next();
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
