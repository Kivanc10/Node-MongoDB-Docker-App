const mongoose = require("mongoose")

mongoose.connect("mongodb://mongo:27017/mini-rest-api",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology : true
})