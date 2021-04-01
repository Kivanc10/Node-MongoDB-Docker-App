const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.get("/users",async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})


router.post("/users",async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;