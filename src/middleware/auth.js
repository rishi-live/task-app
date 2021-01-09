const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'nodejs')
            //console.log(decoded)
            //const user = await User.findOne({ _id: decoded._id})
        const user = await User.findOne({ email: decoded.email, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }
        //console.log(user)
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

module.exports = auth