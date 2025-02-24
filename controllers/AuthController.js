const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/UserModel");
const { hashPassword } = require("../helper/hashPassword");
const { generateToken } = require("../utils/generateToken");




// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST 
// @access public
// ==================================
module.exports.register = asyncHandler(async (req, res) => {
  const { name, username, password, email } = req.body;

  // hash password
  const hashedPassword = await hashPassword(password);

  // Create new user
  const newUser = new UserModel({
    name,
    username,
    email,
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