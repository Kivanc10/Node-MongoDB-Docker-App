const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = async function () {
    /*
    in this function , I'm gonna try to generate auth token for user
    so I will ensure tokens user to make rest-api secure.
    tokens represent the number of logins belong to user 
    */

    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, "myAuthToken10")
    user.tokens = user.tokens.concat({ token }) // add new session to user tokens

    await user.save()

    return token


}

userSchema.statics.userQuery = async function (email, password) {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error()
    }

    return user

}

userSchema.methods.toJSON = function () { // hiding private data
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
}


// this function was implemented to prevent duplicate email in db

userSchema.statics.preventDublicate = async function (obj) {
    const query = await User.findOne({email : obj.email})
    if(!query){
        const user = new User(obj)
        await user.save()
        return user
    }
    else {
        throw new Error()
    }
    
} 



userSchema.pre("save", async function (next) { // it runs when you invoke user.save()
    console.log("save func____")
    /*
    in this func I'm gonna try to hash passwords belong to users
    I will apply to help of "isModified" func
    */
    const user = this;
    if (user.isModified("password")) { // if it is true, it has not hashed
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User


// lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'
// kill -9 `lsof -w -n -i tcp:8080| awk '{print $2}'|awk 'END{print}'`