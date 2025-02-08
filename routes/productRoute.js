const { createProduct, getProducts } = require("../controllers/productController");
const { createProductValidator } = require("../utils/vaildators/productVaildators");

const router = require("express").Router();


router.route("/")
.get(getProducts)
.post(createProductValidator,createProduct)



module.exports = router;