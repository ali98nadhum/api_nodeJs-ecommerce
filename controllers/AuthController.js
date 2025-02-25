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
    newUser.id,
    newUser.username,
    newUser.name,
    newUser.role
  );

  res.status(200).json({message:`login_success hi ${user.username}` , token:token});
})