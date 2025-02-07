const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { CategoryModel } = require("../../models/CategoryModel");



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
    .isMongoId().withMessage("Invalid category id")
    .custom((categoryId) => CategoryModel.findById(categoryId).then((category)=>{
        if(!category){
            return Promise.reject(new Error("Category not found"))
        }
    })),
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