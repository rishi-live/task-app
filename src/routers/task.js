const express = require('express')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()


router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

})

router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send("Task Not Fond in Database")
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        if (!task) {
            return res.status(404).send("task not found")
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async(req, res) => {
    const id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).send('not found!')
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router