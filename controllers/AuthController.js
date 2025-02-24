const asyncHandler = require("express-async-handler");
const { UserModel } = require("../models/UserModel");
const { hashPassword } = require("../helper/hashPassword");




// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST 
// @access public
// ==================================
module.exports.register = asyncHandler(async(req , res) => {
    const {name , username , password , email} = req.body;


    // hash password
    const hashedPassword = await hashPassword(req.body.password);

    // Create new user
  const newUser = new UserModel({
    name,
    username,
    email,
    password: hashedPassword,
  });

  // Save user to database
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
})