const { strict } = require('assert');
const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!!!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
})

const me = new User({
    name: 'Rishi4',
    email: 'RIshi129@gmail.com'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!' + error)
})

// const Task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const task = new Task({
//     description: 'Learn the Mongoose library second time',
//     completed: true
// })
// task.save().then(() => {
//     console.log(task)
// }).catch((error) => {
//     console.log(error)
// })