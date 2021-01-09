const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        //type: String,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


// taskSchema.pre('save', async function(next) {
//     const task = this
//     next()
// })

// const Task = mongoose.model('Task', taskSchema)

const Task = mongoose.model('Task', taskSchema)
module.exports = Task