const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    }
})

userSchema.statics.userQuery = async (email,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error("Unable to login")
    }

    return user

}

userSchema.pre("save",async function (next) { // it runs when you invoke user.save()
    console.log("save func____")
    /*
    in this func I'm gonna try to hash passwords belong to users
    I will apply to help of "isModified" func
    */
    const user = this;
    if(user.isModified("password")){ // if it is true, it has not hashed
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User


// lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'
// kill -9 `lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'`