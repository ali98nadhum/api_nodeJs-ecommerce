const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      minlength: [3, "Product title must be at least 3 characters"],
      maxlength: [100, "Product title must be at most 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Product description must be at least 20 characters"],
      maxlength: [500, "Product description must be at most 500 characters"],
    },

    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      min: 0,
      max: [20, "Too long product price"],
    },

    priceAfterDiscount: {
      type: Number,
    },

    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      trim: true,
      min: 0,
    },

    productCode: {
      type: Number,
      required: [true, "Product code is required"],
      trim: true,
    },

    imageCover: {
      url: { type: String, required: [true, "Image cover is required"] },
      publicId: { type: String },
    },

    images: {
      type: [String],
    },

    SubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategoryModel",
      required: [true, "SubCategory is required"],
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = {
  ProductModel,
};
