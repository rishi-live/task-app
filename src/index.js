const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log("Server is up on port " + port);
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async() => {
    // doesn't work without id which is object id

    // const task = await Task.findById('5ff9dd89cebf7926c4bc1267')
    // console.log(task)
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findOne({ _id: '5ff9dd59cebf7926c4bc1261' })
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

}
main()