const { createProduct, getProducts, deleteProduct, getProductById } = require("../controllers/productController");
const { createProductValidator, deleteProductValidator, getOneProductValidator } = require("../utils/vaildators/productVaildators");

const router = require("express").Router();


router.route("/")
.get(getProducts)
.post(createProductValidator,createProduct)

router.route("/:id")
.get(getOneProductValidator , getProductById)
.delete( deleteProductValidator , deleteProduct)



module.exports = router;