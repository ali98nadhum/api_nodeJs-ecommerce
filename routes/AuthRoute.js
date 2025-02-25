const { register, login } = require("../controllers/AuthController");
const { registerValidator, loginValidator } = require("../utils/vaildators/AuthVaildators");

const router = require("express").Router();


router.route("/register").post( registerValidator, register)
router.route("/login").post(loginValidator , login)



module.exports = router;
