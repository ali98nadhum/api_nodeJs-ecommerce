const { createSubCategory, deleteSubCategory, updateSubCategory } = require("../controllers/subCategoryController");
const { createSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator } = require("../utils/vaildators/subCategoryVaildators");

const router = require("express").Router();


router.route("/")
.post(createSubCategoryValidator , createSubCategory)

router.route("/:id")
.delete(deleteSubCategoryValidator , deleteSubCategory)
.put(updateSubCategoryValidator , updateSubCategory)


module.exports = router;