const express = require("express")
require("./db/mongoose") // connect to database
const User = require("./models/user")
const userRouter = require("./router/user")

const app = express()



const port = 8080

app.use(express.json())
app.use(userRouter)



app.listen(port,() => {
    console.log("server is available on port "+port)
})