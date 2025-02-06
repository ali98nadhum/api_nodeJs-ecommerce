const { createSubCategory, deleteSubCategory } = require("../controllers/subCategoryController");
const { createSubCategoryValidator, deleteSubCategoryValidator } = require("../utils/vaildators/subCategoryVaildators");

const router = require("express").Router();


router.route("/")
.post(createSubCategoryValidator , createSubCategory)

router.route("/:id")
.delete(deleteSubCategoryValidator , deleteSubCategory)


module.exports = router;