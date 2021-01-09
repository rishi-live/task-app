const mongoose = require('mongoose');
// const User = require('')
// const taskSchema = mongoose.Schema({
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })


// taskSchema.pre('save', async function(next) {
//     const task = this
//     next()
// })

// const Task = mongoose.model('Task', taskSchema)

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        //type: mongoose.Schema.Types.ObjectId
        type: String,
        required: true,
        ref: 'User'
    }
})
module.exports = Task