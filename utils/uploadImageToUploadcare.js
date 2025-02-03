

const axios = require("axios");
const FormData = require("form-data");

const uploadImageToUploadcare = async (file) => {
  const formData = new FormData();
  formData.append("UPLOADCARE_PUB_KEY", process.env.UPLOADCARE_PUBLIC_KEY);
  formData.append("UPLOADCARE_STORE", "1"); // تخزين الصورة في Uploadcare
  formData.append("file", file.buffer, { filename: file.originalname });

  try {
    // رفع الصورة إلى Uploadcare
    const uploadResponse = await axios.post("https://upload.uploadcare.com/base/", formData, {
      headers: { ...formData.getHeaders() },
    });

    const imageUrl = `https://ucarecdn.com/${uploadResponse.data.file}/`;
    const publicId = uploadResponse.data.file;

    return { imageUrl, publicId };
  } catch (error) {
    throw new Error("Error uploading image to Uploadcare: " + error.message);
  }
};

module.exports = { uploadImageToUploadcare };
