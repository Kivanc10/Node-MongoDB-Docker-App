const express = require("express")
const hbs = require("hbs")
const path = require("path")
const Task = require("./models/task")
require("./db/mongoose") // connect to database
const User = require("./models/user")
const userRouter = require("./router/user")
const taskRouter = require("./router/task")

const app = express()


const port = 8080


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const publicDirectory = path.join(__dirname, "./public")

app.set("view engine", "hbs")
app.set("views", publicDirectory)

app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome to main page",
        name: "This page is created by Kıvanç Aydoğmuş"
    })
})


app.listen(port, () => {
    console.log("server is available on port " + port)
})