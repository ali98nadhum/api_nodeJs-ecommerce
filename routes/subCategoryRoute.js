const { createSubCategory } = require("../controllers/subCategoryController");
const { createCategoryValidator } = require("../utils/vaildators/subCategoryVaildators");

const router = require("express").Router();


router.route("/")
.post(createCategoryValidator , createSubCategory)


module.exports = router;