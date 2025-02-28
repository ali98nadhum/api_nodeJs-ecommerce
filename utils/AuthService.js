const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');


exports.protect = asyncHandler(async(req , res , next) => {
    // 1- check if token exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({message: "you are not logged "});
    }

    // 2- verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "your token is invalid or expired" });
    }
})

