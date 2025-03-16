const { check } = require("express-validator");
const VaildatorMiddleware = require("../../middlewares/vaildatorMiddleware");
const { SubCategoryModel } = require("../../models/subCategoryModel");


exports.createProductValidator = [
  check("title")
    .isString()
    .withMessage("Product title must be a string")
    .notEmpty()
    .withMessage("title product is required")
    .isLength({ min: 3 })
    .withMessage("Too short category title")
    .isLength({ max: 100 })
    .withMessage("Too long category title"),
  check("description")
    .isString()
    .withMessage("Product description must be a string")
    .notEmpty()
    .withMessage("description product is required")
    .isLength({ min: 20 })
    .withMessage("Too short category title")
    .isLength({ max: 500 })
    .withMessage("Too long category title"),
  check("price")
    .isNumeric()
    .withMessage("price must be a number")
    .notEmpty()
    .withMessage("product price is required")
    .custom((value) => value >= 0)
    .withMessage("Price must be a positive number"),
  check("quantity")
    .isNumeric()
    .withMessage("quantity must be a number")
    .notEmpty()
    .withMessage("product quantity is required")
    .custom((value) => value >= 0)
    .withMessage("quantity must be a positive number"),
  check("productCode")
    .isString()
    .withMessage("product code must be a string")
    .notEmpty()
    .withMessage("product code is required"),
  check("images").isArray().withMessage("Images must be an array"),
  check("SubCategory")
    .notEmpty()
    .withMessage("subcategory is required")
    .isMongoId()
    .withMessage("Invalid subcategory id")
    .custom((sybcategoryId) =>
      SubCategoryModel.findById(sybcategoryId).then((subCategory) => {
        if (!subCategory) {
          return Promise.reject(new Error("subCategory not found"));
        }
      })
    ),
  VaildatorMiddleware,
];


exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id"),
  VaildatorMiddleware,
]


exports.getOneProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id"),
  VaildatorMiddleware,
]
