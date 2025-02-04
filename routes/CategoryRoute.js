const router = require("express").Router();
const { createCategory, getAllCategories, deleteCategory } = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {createCategoryValidator , deleteCategoryValidator} = require("../utils/vaildators/CategoryVaildators")

router.route("/")
.post(uploadPhoto.single("image"),createCategoryValidator ,createCategory)
.get(getAllCategories)

router.route("/:id")
.delete(deleteCategoryValidator,deleteCategory)

module.exports = router;