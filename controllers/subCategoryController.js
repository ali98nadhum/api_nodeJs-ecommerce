const asyncHandler = require("express-async-handler");
const { SubCategoryModel } = require("../models/subCategoryModel");

// ==================================
// @desc Create a new SubCategory
// @route /api/v1/subcategory
// @method POST
// @access private (only admin)
// ==================================
module.exports.createSubCategory = asyncHandler(async (req, res) => {
  const { title, category } = req.body;

  const newSubCategory = SubCategoryModel({
    title,
    category,
  });

  await newSubCategory.save();

  res.status(201).json(newSubCategory);
});
