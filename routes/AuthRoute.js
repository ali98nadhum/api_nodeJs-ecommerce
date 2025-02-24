const { register } = require("../controllers/AuthController");

const router = require("express").Router();


router.route("/register").post(register)



module.exports = router;