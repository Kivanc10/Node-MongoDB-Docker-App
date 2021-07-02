const express = require("express")
const User = require("../models/user")
const router = express.Router()
const auth = require("../middleware/auth")
const multer = require("multer")

const upload = multer({
    //dest : "avatars", // we dont need anymore becasue we save avatar in server
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith(".jpg") || file.originalname.endsWith(".jpeg") || file.originalname.endsWith(".png")) {
            cb(new Error("The extension of file must be .jpg or .jpeg or .png"))
        }
        cb(undefined, true)
    }
})



router.post("/users", async (req, res) => { // sign up

    try {
        const user = await User.preventDublicate(req.body)
        const token = await user.generateAuthToken() // add user's token to new session and save them

        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send("This email has been used already")
    }
})



router.post("/users/login", async (req, res) => { // logIn
    try {
        // make control that whether user have logged in before or not
        const user = await User.userQuery(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (error) {
        res.status(400).send("Unable to login")
    }
})




router.get("/users/me", auth, async (req, res) => {  // show me
    res.send(req.user)
})



router.post("/users/logout", auth, async (req, res) => { // logout from last toekn(session)
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


router.post("/users/logoutAll", auth, async (req, res) => { // logout from all sessions
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

// delete the current user(me)
router.delete("/users/me",auth,async (req,res) => {
    try {
        await User.findByIdAndDelete({_id : req.user_id}) // delete user id
        await req.user.save()
        res.status(200).send("Users was deleted succesfully")
    } catch (error) {
        res.status(500).send(error)
    }
})



router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body) // it retrieves just keys
    const currentMetrics = ['name', 'email', 'password']

    const isValid = updates.every((metric) => currentMetrics.includes(metric))

    if (!isValid) {
        return res.status(400).send({ error: "Invalid parameters" })
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

// to upload avatar images for the user
/*
this allows us to save avatar of the user onto file system , not servers
I'm gonna create that avat on servers
*/

// this is the key in the single function (as parameter)

// router.post("/users/me/avatar",upload.single("avatar"),(req,res) => {
//     res.status(200).send("Succeed")
// },(err,req,res,next) => { // to set up to handle any uncaught erros in this case,any errors that have
//     res.status(404).send({error : err.message})
// })

// to save the avatar of user onto server and to check the user authenticated

router.post("/users/me/avatar", auth, upload.single("avatar"), async (req, res) => {
    req.user.avatar = req.file.buffer // to assign binary value(image) // adjust the user image
    await req.user.save() // save all changes(add avatar)
    res.status(200).send("Succeed")
}, (err, req, res, next) => { // to set up to handle any uncaught erros in this case,any errors that have
    res.status(404).send({ error: err.message })
})

// to delete avatar of the user 

router.delete("/users/me/avatar",auth,async (req,res) => {
    req.user.avatar = undefined // delete the user avatar / make user avatar undefined
    await req.user.save() // save all changes
    res.status(200).send("User avatar is deleted")
},(err,req,res,next) => {
    res.send(404).send({error : err.message})
})

// to serving up avatar of the user

router.get("/users/:id/avatar",async (req,res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error("There is no user or user image");
        }

        res.set("Content-Type","image/jpg") // to set content type as image
        res.send(user.avatar)
    } catch (error) {
        res.status(404).send(error)
    }
})

module.exports = router;