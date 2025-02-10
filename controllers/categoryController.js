const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../models/CategoryModel");
const {SubCategoryModel} = require("../models/subCategoryModel");
const {
  uploadImageToUploadcare,
  deleteImageFromUploadcare,
} = require("../utils/uploadImageToUploadcare");




// ==================================
// @desc Get All Categories
// @route /api/v1/category
// @method GET
// @access public
// ==================================
module.exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await CategoryModel.find({});
  res.status(200).json({ data: categories });
});




// ==================================
// @desc Get Category by id
// @route /api/v1/category/:id
// @method GET
// @access public
// ==================================
module.exports.getCategoryById = asyncHandler(async(req , res) => {
  const category = await CategoryModel.findById(req.params.id).populate("subcategories");
  if(!category){
    return res.status(404).json({ message: "not found category for this id" });
  }

  res.status(200).json({ data: category})
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
// @desc Update category
// @route /api/v1/category/:id
// @method PUT
// @access private (only admin)
// ==================================
module.exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "not found category for this id" });
  }

  // upload new image
  let image = category.image;
  if (req.file) {
    const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);
    image = {
      url: imageUrl,
      publicId: publicId,
    };

    // Delete old image
    if (category.image.publicId) {
      await deleteImageFromUploadcare(category.image.publicId);
    }
  }

  // Update category in database
  const updateCategory = await CategoryModel.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, image: image },
    { new: true }
  );

  // send return
  res.status(200).json({ data: updateCategory });
});




// ==================================
// @desc Delete category
// @route /api/v1/category/:id
// @method DELETE
// @access private (only admin)
// ==================================
module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await CategoryModel.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // delete image from uploadcare
  if (category.image.publicId) {
    await deleteImageFromUploadcare(category.image.publicId);
  }

  // delete subCategory
  await SubCategoryModel.deleteMany({ category: category._id });

  res.json({ message: "Category deleted successfully" });
});
