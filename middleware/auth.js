const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ","")
        const decoded = jwt.verify(token,"myAuthToken10") 
        // console.log("decoded -> ",decoded)
        const user = await User.findOne({_id : decoded._id,"tokens.token":token})
        if(!user){
            throw new Error()
        }

        req.user = user
        req.token = token // I taken to use for delete process
        req.user_id = decoded._id // to delete the current user by its id
        next()

    } catch (error) {
        res.status(401).send({error : "Please authenticate"})
    }
}


module.exports = auth