const express = require('express')
const { update } = require('../models/user')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {

        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/user/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
            //user.getPublicProfile()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('Invalid Email/Password')
    }
})

// router.get('/users', auth, async(req, res) => {

//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }

})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', auth, async(req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send(user)
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        // const isValidOperation = updates.every((update) => {
        //     return allowedUpdates.includes(update)
        // })

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // const user = await User.findOne(req.user.email)

        updates.forEach((update) => req.user[update] = req.body[update])

        // updates.forEach((update) => {
        //     user[update] = req.body[update]
        // })
        await req.user.save()
            //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })


        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async(req, res) => {

    try {
        // const user = await User.findOneAndDelete(req.user.email)

        // if (!user) {
        //     return res.status(404).send('not found!')
        // }

        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router