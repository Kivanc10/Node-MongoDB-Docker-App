const express = require("express")
const User = require("../models/user")
const router = express.Router()
const auth = require("../middleware/auth")



// router.post("/users",async (req,res) => { // sign up
//     const user = new User(req.body)
//     try {
        
//         await user.save() // first save
//         const token = await user.generateAuthToken() // add user's token to new session and save them

//         res.status(201).send({user,token})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

router.post("/users",async (req,res) => { // sign up
   
    try {
        const user = await User.preventDublicate(req.body)
        const token = await user.generateAuthToken() // add user's token to new session and save them

        res.status(201).send({user,token})
    } catch (error) {
        res.status(400).send("This email has been used already")
    }
})



router.post("/users/login",async (req,res) => { // logIn
    try {
        // make control that whether user have logged in before or not
        const user = await User.userQuery(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    } catch (error) {
        res.status(400).send("Unable to login")
    }
})




router.get("/users/me",auth,async (req,res) => {  // show me
    res.send(req.user)
})



router.post("/users/logout",auth,async (req,res) => { // logout from last toekn(session)
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post("/users/logoutAll",auth,async (req,res) => { // logout from all sessions
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})



router.patch("/users/me",auth,async (req,res) => {
    const updates = Object.keys(req.body) // it retrieves just keys
    const currentMetrics = ['name', 'email', 'password']

    const isValid = updates.every((metric) => currentMetrics.includes(metric))

    if(!isValid){
        return res.status(400).send({error : "Invalid parameters"})
    }


    try {
        
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)

    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete("/users/:id",async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router;