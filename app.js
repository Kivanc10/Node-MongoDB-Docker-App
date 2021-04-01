const express = require("express")
require("../first/db/mongoose") // connect to database
const User = require("../first/db/mongoose")

const app = express()


const port = 8080


app.use(express.json())


app.get("/users",async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})


app.listen(port,() => {
    console.log("server is available on port "+port)
})