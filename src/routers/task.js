const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async(req, res) => {
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user.email
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks', auth, async(req, res) => {

    try {
        const tasks = await Task.find({ owner: req.user.email })
            //await req.user.populate('tasks').execPopulate()
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user.email })
        if (!task) {
            return res.status(404).send("Task Not Fond in Database")
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.email })

        if (!task) {
            return res.status(404).send("task not found")
        }
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {

    try {

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.email })
        if (!task) {
            return res.status(404).send('not found!')
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router