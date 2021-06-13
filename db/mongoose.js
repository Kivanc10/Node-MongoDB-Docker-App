const mongoose = require("mongoose")
//mongo --> 127.0.0.1
mongoose.connect("mongodb://mongo/mini-rest-api",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology : true
})