const asyncHandler = require("express-async-handler");
const { ProductModel } = require("../models/ProductModel");




// ==================================
// @desc Create a new Product
// @route /api/v1/products
// @method POST
// @access private (only admin)
// ==================================
module.exports.createProduct = asyncHandler(async(req , res) => {
    const product = await ProductModel.create(req.body);
    res.status(201).json({data: product});
})