const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");

exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min:5}).withMessage("Too short category title")
    .isLength({max:100}).withMessage("Too long category title"),
    VaildatorMiddleware,
]




exports.getOneCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware
]


exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware
]

exports.updateCategoryValidator = [
    check("id")
    .isMongoId()
    .withMessage("Invalid category id"),
    check("title")
    .optional()
    .isLength({min:5}).withMessage("Too short category title")
    .isLength({max:100}).withMessage("Too long category title"),
    VaildatorMiddleware,
]