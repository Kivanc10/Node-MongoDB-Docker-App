const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : { // an user has tasks
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
})

const Task = mongoose.model("Task",taskSchema)



module.exports = Task