const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true , "Name is required"],
            trim: true,
            minlength: [3 , "name must be at least 3 characters"],
            maxlength: [25 , 'name must be at most 25 characters']
        },

        username: {
            type: String,
            required: [true , "Username is required"],
            trim: true,
            minlength: [3 , "username must be at least 3 characters"],
            maxlength: [25 , 'username must be at most 25 characters'],
            unique: [true , 'username must be unique']
        },

        password: {
            type: String,
            required: [true , "Password is required"],
            trim: true,
            minlength: [8 , "password must be at least 8 characters"],
        },

        email: {
            type: String,
            required: [true , "Email is required"],
            trim: true,
            unique: [true , 'email must be unique'],
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
        },

        imageCover: {
            url: {type:String},
            publicId: {type:String},
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },

        phone:String,

        passwordChangeAt:Date
    }
)



const UserModel = mongoose.model("UserModel" , UserSchema);

module.exports = {
    UserModel
}