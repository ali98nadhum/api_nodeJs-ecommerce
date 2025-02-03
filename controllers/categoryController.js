const asyncHandler = require("express-async-handler");
const { CategoryModel } = require("../models/CategoryModel");
const axios = require("axios");
const FormData = require("form-data");





// ==================================
// @desc Create a new Category
// @route /api/v1/category
// @method POST
// @access private (only admin)
// ==================================
module.exports.createCategory = asyncHandler(async(req , res) => {
    try {
        const { title } = req.body;
    
        if (!req.file) {
          return res.status(400).json({ error: "Image is required" });
        }
    
        // تجهيز الصورة لإرسالها إلى Uploadcare
        const formData = new FormData();
        formData.append("UPLOADCARE_PUB_KEY", process.env.UPLOADCARE_PUBLIC_KEY);
        formData.append("UPLOADCARE_STORE", "1"); // تخزين الصورة في Uploadcare
        formData.append("file", req.file.buffer, { filename: req.file.originalname });
    
        // رفع الصورة إلى Uploadcare
        const uploadResponse = await axios.post("https://upload.uploadcare.com/base/", formData, {
          headers: { ...formData.getHeaders() },
        });
    
        const imageUrl = `https://ucarecdn.com/${uploadResponse.data.file}/`;
        const publicId = uploadResponse.data.file;
    
        // إنشاء الفئة الجديدة
        const newCategory = new CategoryModel({
          title,
          image: { url: imageUrl, publicId },
        });
    
        await newCategory.save();
    
        res.status(201).json({ message: "Category created successfully", category: newCategory });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
})