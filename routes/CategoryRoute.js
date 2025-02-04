const router = require("express").Router();
const { createCategory, getAllCategories } = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {createCategoryValidator} = require("../utils/vaildators/CategoryVaildators")

router.route("/").
post(uploadPhoto.single("image"),createCategoryValidator ,createCategory)
.get(getAllCategories)


module.exports = router;