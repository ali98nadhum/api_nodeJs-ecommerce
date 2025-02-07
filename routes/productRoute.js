const { createProduct } = require("../controllers/productController");

const router = require("express").Router();


router.route("/")
.post(createProduct)



module.exports = router;