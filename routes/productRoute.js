const { createProduct } = require("../controllers/productController");
const { createProductValidator } = require("../utils/vaildators/productVaildators");

const router = require("express").Router();


router.route("/")
.post(createProductValidator,createProduct)



module.exports = router;