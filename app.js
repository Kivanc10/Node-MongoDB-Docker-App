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

const multer = require("multer") // to upload files

const upload = multer({ // to configure our uploads system
    dest : "images", // destination,
    limits : { // to define a set of restrict
        fileSize : 1000000
    },
    // to configure some files we dont want to upload
    fileFilter(req,file,cb) { // request,file,callback
        if(!file.originalname.endsWith(".pdf")){
            return cb(new Error("File must be PDF"));
        }
        cb(undefined,true) // if everyting is ok
        // cb(new Error("File must be PDF")); // when try to upload wrong type of file
        // cb(undefined,true) // (error,is uploaded)
        // cb(undefined,false) // (error,is uploaded)
    }
})

app.post("/upload",upload.single("upload"),(req,res) => {
    res.send("Upload is achieved")
})


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