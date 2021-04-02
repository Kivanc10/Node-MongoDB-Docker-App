const express = require("express")
const hbs = require("hbs")
const path = require("path")
require("./db/mongoose") // connect to database
const User = require("./models/user")
const userRouter = require("./router/user")


const app = express()


const port = 8080

// app.use((req,res,next) => {
//     if(req.method == "GET"){
//         res.send("Get method are disabled")
//     }
//     else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send({error : "we are maintenance"})
//     next()
// })

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


// const bcrypt = require("bcryptjs")
// const fun = async () => {
//     const pswrd = "red_fucker___1"
//     const hashd_pswrd = await bcrypt.hash(pswrd,8)
//     console.log("original pswrd -> ",pswrd)
//     console.log("hashed_pswrd -> ",hashd_pswrd)

//     const isMatch = await bcrypt.compare("red_fucker___1",hashd_pswrd)
//     console.log("ismatched ? ",isMatch)
// }

// fun()

const jwt = require("jsonwebtoken")

const myFunc = async () => {
    const token = jwt.sign({_id:"ab1234"},"thisisnewjwt",{expiresIn : "7 days"})
    console.log("Token -> " + token)
    const data = jwt.verify(token,"thisisnewjwt")
    console.log("data -> " + data._id)
}



myFunc()

app.listen(port,() => {
    console.log("server is available on port "+port)
})