const {
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategories,
  getSubCategoryById,
} = require("../controllers/subCategoryController");
const {
  createSubCategoryValidator,
  deleteSubCategoryValidator,
  updateSubCategoryValidator,
  getOneSubCategoryValidator,
} = require("../utils/vaildators/subCategoryVaildators");

const router = require("express").Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getAllSubCategories);

router
  .route("/:id")
  .get(getOneSubCategoryValidator , getSubCategoryById)
  .delete(deleteSubCategoryValidator, deleteSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)


module.exports = router;
