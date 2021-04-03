const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("./db/mongoose") // connect to database
const User = require("./models/user")
const userRouter = require("./router/user")


const app = express()


const port = 8080


app.use(express.json())
app.use(userRouter)

const publicDirectory = path.join(__dirname,"./public")

app.set("view engine","hbs")
app.set("views",publicDirectory)

app.get("/",(req,res) => {
    res.render("index",{
        title : "Welcome main page",
        name : "This page is created by Kıvanç Aydoğmuş"
    })
})



app.listen(port,() => {
    console.log("server is available on port "+port)
})