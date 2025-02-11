const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      trim: true,
      minlength: [5, "category must be at least 5 characters"],
      maxlength: [100, "category must be at most 100 characterss"],
    },

    image: {
      url: { type: String },
      publicId: { type: String },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);




// for get subcategory
CategorySchema.virtual("subcategories", {
  ref: "SubCategoryModel", 
  localField: "_id", 
  foreignField: "category",
});

const CategoryModel = mongoose.model("CategoryModel", CategorySchema);

module.exports = {
  CategoryModel,
};
