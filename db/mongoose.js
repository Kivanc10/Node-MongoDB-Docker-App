const mongoose = require("mongoose")
//mongo --> 127.0.0.1
mongoose.connect("mongodb://127.0.0.1:27017/mini-rest-api",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : true,
    useUnifiedTopology : true
})