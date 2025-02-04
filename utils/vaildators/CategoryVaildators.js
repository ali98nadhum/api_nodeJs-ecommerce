const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");

exports.createCategoryValidator = [
    check("title")
    .notEmpty().withMessage("title is requireddddddddddd")
    .isLength({min:5}).withMessage("Too short category title")
    .isLength({max:100}).withMessage("Too long category title"),
    VaildatorMiddleware,
]