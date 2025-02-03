const router = require("express").Router();
const { createCategory } = require("../controllers/categoryController");
const uploadPhoto = require("../middlewares/uploadPhoto");

router.route("/").post(uploadPhoto.single("image") ,createCategory)


module.exports = router;