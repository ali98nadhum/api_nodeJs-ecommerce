const { register, login, changePassword } = require("../controllers/AuthController");
const { registerValidator, loginValidator } = require("../utils/vaildators/AuthVaildators");
const AuthService = require("../utils/AuthService");

const router = require("express").Router();


router.route("/register").post( registerValidator, register)
router.route("/login").post(loginValidator , login)
router.route("/changePassword").post(AuthService.protect,changePassword)



module.exports = router;
