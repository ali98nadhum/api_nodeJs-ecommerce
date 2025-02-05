const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");


exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is required")
    .isLength({min:5}).withMessage("Too short category title")
    .isLength({max:100}).withMessage("Too long category title"),
    check("category")
    .notEmpty().withMessage("category is required")
    .isMongoId().withMessage("Invalid category id"),
    VaildatorMiddleware,
]