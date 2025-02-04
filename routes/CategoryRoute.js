const router = require("express").Router();
const { createCategory, getAllCategories, deleteCategory, updateCategory } = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {createCategoryValidator , deleteCategoryValidator, updateCategoryValidator} = require("../utils/vaildators/CategoryVaildators")

router.route("/")
.post(uploadPhoto.single("image"),createCategoryValidator ,createCategory)
.get(getAllCategories)

router.route("/:id")
.delete(deleteCategoryValidator,deleteCategory)
.put(uploadPhoto.single("image"),updateCategoryValidator ,updateCategory)

module.exports = router;