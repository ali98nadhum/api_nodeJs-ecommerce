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


// ==================================
// @desc delete SubCategory
// @route /api/v1/subcategory/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteSubCategory = asyncHandler(async(req , res) => {
  const subCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
  if(!subCategory){
    return res.status(404).json({message: "SubCategory not found"})
  }

  res.status(200).json({ message: "SubCategory deleted successfully" });
})
