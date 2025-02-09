const { createProduct, getProducts, deleteProduct } = require("../controllers/productController");
const { createProductValidator, deleteProductValidator } = require("../utils/vaildators/productVaildators");

const router = require("express").Router();


router.route("/")
.get(getProducts)
.post(createProductValidator,createProduct)

router.route("/:id")
.delete( deleteProductValidator , deleteProduct)


module.exports = router;