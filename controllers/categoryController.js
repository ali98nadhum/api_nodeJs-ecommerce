const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../models/CategoryModel");
const axios = require("axios");
const FormData = require("form-data");
const {uploadImageToUploadcare} = require("../utils/uploadImageToUploadcare");



// ==================================
// @desc Create a new Category
// @route /api/v1/category
// @method POST
// @access private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async(req , res) => {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

      // رفع الصورة باستخدام الدالة الخارجية
      const { imageUrl, publicId } = await uploadImageToUploadcare(req.file);

      // إنشاء الفئة الجديدة
      const newCategory = new CategoryModel({
        title,
        image: { url: imageUrl, publicId },
      });

      await newCategory.save();

      res.status(201).json(newCategory)
})