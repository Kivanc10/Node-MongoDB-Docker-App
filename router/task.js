const express = require("express")
const Task = require("../models/task")
const auth = require("../middleware/auth")
const { parse } = require("path")
const User = require("../models/user")
const router = express.Router()


router.post("/tasks",auth,async (req,res) => { // auth allows us to make operations with user which authenticated

    const task = new Task({
        ...req.body,
        owner : req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks/?completed=true

// GET /tasks/sortBy=createdAt:desc

router.get("/tasks",auth,async (req,res) => {
    const match = {}

    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":") // createdAt,desc(asc)
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }


    if (req.query.completed){ // if completed is true
        match.completed = req.query.completed === "true"
    }

    try {
        await req.user.populate({
            path : "tasks", 
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})


router.get("/tasks/list",async(req,res) => {

    const match = {}

    const sort = {}

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":") // createdAt,desc(asc)
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }


    if (req.query.completed){ // if completed is true
        match.completed = req.query.completed === "true"
    }

    

    try {
        const tasks = await Task.find({},null,{sort:{date : -1}})
        if(!tasks) {
            throw new Error("An error occured during the find tasks")
        }
        res.status(200).send(tasks)

    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch("/tasks/:id",auth,async (req,res) => {
    const updates = Object.keys(req.body)
    const metrics = ["description","completed"]
    const isValid = updates.every((metric) => metrics.includes(metric))

    if(!isValid){
        return res.status(400).send({error : "Invalid updates"})
    }

    try {
        const task = await Task.findOne({_id : req.params.id,owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
        
    }

})


router.delete("/tasks/:id",auth,async (req,res) => {
    try {
        const task = await Task.findByIdAndDelete({_id : req.params.id,owner : req.user._id})
        if(!task){
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})




module.exports = router;