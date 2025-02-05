const asyncHandler = require("express-async-handler");
const { SubCategoryModel } = require("../models/subCategoryModel");
const { CategoryModel } = require("../models/CategoryModel");

// ==================================
// @desc Create a new SubCategory
// @route /api/v1/subcategory
// @method POST
// @access private (only admin)
// ==================================
module.exports.createSubCategory = asyncHandler(async (req, res) => {
  const { title, category } = req.body;

  // check if category exists
  const categoryExists = await CategoryModel.findById(category);
  if (!categoryExists) {
    return res.status(404).json({ message: "Category not found" });
  }

  // create new subcategory
  const newSubCategory = new SubCategoryModel({
    title,
    category,
  });

  await newSubCategory.save();

  res.status(201).json(newSubCategory);
});
