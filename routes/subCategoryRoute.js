const { createSubCategory } = require("../controllers/subCategoryController");
const { createSubCategoryValidator } = require("../utils/vaildators/subCategoryVaildators");

const router = require("express").Router();


router.route("/")
.post(createSubCategoryValidator , createSubCategory)


module.exports = router;