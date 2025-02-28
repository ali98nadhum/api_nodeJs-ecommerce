const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/UserModel");
const { hashPassword } = require("../helper/hashPassword");
const { generateToken } = require("../utils/generateToken");
const bcrypt = require("bcryptjs");




// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST 
// @access public
// ==================================
module.exports.register = asyncHandler(async (req, res) => {
  const { name, username, password, email , phone } = req.body;

  // hash password
  const hashedPassword = await hashPassword(password);

  // Create new user
  const newUser = new UserModel({
    name,
    username,
    email,
    phone,
    password: hashedPassword,
  });

  // Generate a JWT token for a user.
  const token = generateToken(
    newUser.id,
    newUser.username,
    newUser.name,
    newUser.role
  );
  // Save user to database
  await newUser.save();

  res
    .status(201)
    .json({ message: "User registered successfully", token: token });
});



// ==================================
// @desc Login 
// @route /api/v1/auth/login
// @method POST
// @access Public 
// ==================================
module.exports.login = asyncHandler(async(req , res) => {
  const {email , password} = req.body;

  // Check if user exists
  const user = await UserModel.findOne({email});
  if(!user){
    return res.status(400).json({message: "Invalid email or password"})
  }

  // Check if password matches
  const isPasswordMatch = await bcrypt.compare(password , user.password);
  if(!isPasswordMatch){
    return res.status(400).json({message: "Invalid email or password"})
  }

   // Generate a JWT token for a user.
   const token = generateToken(
    user.id,
    user.username,
    user.name,
    user.role
  );

  res.status(200).json({message:`login_success hi ${user.username}` , token:token});
})




// ==================================
// @desc change password to current user
// @route /api/v1/auth/changePassword
// @method POST 
// @access private (only user logged in)
// ==================================
module.exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await UserModel.findById(req.user.id);
  if (!user) {
      return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});