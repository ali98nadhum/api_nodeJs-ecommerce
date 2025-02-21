const asyncHandler = require("express-async-handler");
const { ProductModel } = require("../models/ProductModel");





// ==================================
// @desc Get All Product
// @route /api/v1/products
// @method GET
// @access public
// ==================================
module.exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 8 || 8;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sort || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const products = await ProductModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: order });
  const totalProducts = await ProductModel.countDocuments();
  res.status(200).json({ totalProducts, page, data: products });
});





// ==================================
// @desc Get product by Id
// @route /api/v1/products/:id
// @method GET
// @access public
// ==================================
module.exports.getProductById = asyncHandler(async(req , res) => {
  const product = await ProductModel.findById(req.params.id);
  if(!product){
    return res.status(404).json({message: 'Product not found'})
  }

  res.status(200).json({ data: product });
})





// ==================================
// @desc Create a new Product
// @route /api/v1/products
// @method POST
// @access private (only admin)
// ==================================
module.exports.createProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});



// ==================================
// @desc Delete a product
// @route /api/v1/products/:id
// @method POST
// @access private (only admin)
// ==================================
module.exports.deleteProduct = asyncHandler(async(req , res) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  if(!product){
    return res.status(404).json({message: 'Product not found'})
  }

  res.status(200).json({message: 'Product deleted successfully'})
})
