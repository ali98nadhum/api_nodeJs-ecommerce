const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");



exports.getOneSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid subcategory id"),
    VaildatorMiddleware
]


exports.createSubCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min:2}).withMessage("Too short subcategory title")
    .isLength({max:100}).withMessage("Too long subcategory title"),
    check("category")
    .notEmpty().withMessage("category is required")
    .isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware,
]


exports.deleteSubCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid subcategory id"),
    VaildatorMiddleware,
]


exports.updateSubCategoryValidator = [
    check("title")
    .optional()
    .isLength({min:2}).withMessage("Too short subcategory title")
    .isLength({max:100}).withMessage("Too long subcategory title"),
    check("category")
    .optional()
    .isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware,
]