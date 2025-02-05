const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "subcategory title is required"],
      trim: true,
      minlength: [5, "title must be at least 5 characters"],
      maxlength: [100, "title must be at most 100 characterss"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "category is required"],
    },
  },
  { timestamps: true }
);

const SubCategoryModel = mongoose.model("SubCategoryModel", SubCategorySchema);

module.exports = {
  SubCategoryModel,
};
