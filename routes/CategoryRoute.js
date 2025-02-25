const router = require("express").Router();
const {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getCategoryById,
} = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");
const {
  createCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
  getOneCategoryValidator,
} = require("../utils/vaildators/CategoryVaildators");
const AuthService = require("../utils/AuthService");



router.route("/")
  .post(AuthService.protect,uploadPhoto.single("image"), createCategoryValidator, createCategory)
  .get(getAllCategories);

router.route("/:id")
  .get(getOneCategoryValidator, getCategoryById)
  .delete(AuthService.protect,deleteCategoryValidator, deleteCategory)
  .put(AuthService.protect,uploadPhoto.single("image"), updateCategoryValidator, updateCategory);


  
module.exports = router;
