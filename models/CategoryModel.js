const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      unique: [true, "Category title is unique"],
      trim: true,
      minlength: [5, "category must be at least 5 characters"],
      maxlength: [100, "category must be at most 100 characterss"],
    },

    image: {
      type: Object,
      required: [true, "Category image is required"],
      default: {
        url: "",
        publicId: null,
      },
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

module.exports = {
  CategoryModel,
};
