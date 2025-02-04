const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../models/CategoryModel");
const { uploadImageToUploadcare } = require("../utils/uploadImageToUploadcare");




// ==================================
// @desc Get All Categories
// @route /api/v1/category
// @method GET
// @access public
// ==================================
module.exports.getAllCategories = asyncHandler(async(req , res) => {
  const categories = await CategoryModel.find({});
  res.status(200).json({data: categories})
})


// ==================================
// @desc Create a new Category
// @route /api/v1/category
// @method POST
// @access private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image is required" });
  }

  //  Upload image
  const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);

  // Create new category
  const newCategory = new CategoryModel({
    title,
    image: { url: imageUrl, publicId },
  });

  await newCategory.save();

  res.status(201).json(newCategory);
});



// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteCategory = asyncHandler(async(req , rea) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if(!category){
    return res.status(404).json({message: "Category not found"})
  }

  res.status(204).json({message: "Category deleted successfully"})
})