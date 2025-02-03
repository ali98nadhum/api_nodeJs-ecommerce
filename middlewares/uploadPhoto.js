const multer = require("multer");

const storage = multer.memoryStorage(); // لا نحتاج إلى حفظ الملف محليًا
const upload = multer({ storage });

module.exports = upload;
