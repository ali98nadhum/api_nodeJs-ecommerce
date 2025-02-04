const router = require("express").Router();
const { createCategory } = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {createCategoryValidator} = require("../utils/vaildators/CategoryVaildators")

router.route("/").post(uploadPhoto.single("image"),createCategoryValidator ,createCategory)


module.exports = router;