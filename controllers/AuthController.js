const asyncHandler = require("express-async-handler");




// ==================================
// @desc Register new user
// @route /api/v1/auth/register
// @method POST 
// @access public
// ==================================
module.exports.register = asyncHandler(async(req , res) => {
    const {name , username , password , email} = req.body;
})