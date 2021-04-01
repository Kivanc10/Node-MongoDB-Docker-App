const mongoose = require("mongoose")
const validate = require("validate")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Your password should not be include 'password'")
            }
        }
    }
})

const User = mongoose.model("User",userSchema);


module.exports = User;