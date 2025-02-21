const asyncHandler = require("express-async-handler");
const { SubCategoryModel } = require("../models/subCategoryModel");
const { CategoryModel } = require("../models/CategoryModel");



// ==================================
// @desc Get All Sub Categories
// @route /api/v1/subcategory
// @method GET
// @access public
// ==================================
module.exports.getAllSubCategories = asyncHandler(async(req , res) => {
  const subCategory = await SubCategoryModel.find();
  res.status(200).json({ data: subCategory });
})





// ==================================
// @desc Get SubCategory by id
// @route /api/v1/subcategory/:id
// @method GET
// @access public
// ==================================
module.exports.getSubCategoryById = asyncHandler(async(req , res) => {
  const id = req.params.id;
  const subCategory = await SubCategoryModel.findById(id).populate("products");
  if(!subCategory){
    return res.status(404).json({ message: "Subcategory not found" });
  }

  res.status(200).json({ data: subCategory });
})




// ==================================
// @desc Create a new SubCategory
// @route /api/v1/subcategory
// @method POST
// @access private (only admin)
// ==================================
module.exports.createSubCategory = asyncHandler(async (req, res) => {
  const { title, category } = req.body;

  // create new subcategory
  const newSubCategory = new SubCategoryModel({
    title,
    category,
  });

  await newSubCategory.save();

  res.status(201).json(newSubCategory);
});


// ==================================
// @desc update SubCategory
// @route /api/v1/subcategory/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateSubCategory = asyncHandler(async(req , res) => {
  const { title, category } = req.body;
  const {id} = req.params;

  const updateFields = {};
  if(title) updateFields.title = title;
  if(category) updateFields.category = category;

  const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    updateFields,
    { new: true, runValidators: true }
  );

  if (!updatedSubCategory) {
    res.status(404).json({message: "SubCategory not found"})
  }


  res.status(200).json({data: updatedSubCategory});
})


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
