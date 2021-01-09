const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send("GET request are disabled")
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send("Upgrading services")
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log("Server is up on port " + port);
})

// const bcrypt = require('bcrypt')

// const myFunction = async() => {
//     const pass = 'Red12345!'
//     const hash = await bcrypt.hash(pass, 8)

//     console.log(hash);
//     console.log(pass)

//     const ismatch = await bcrypt.compare('Red12345!', hash)

//     console.log(ismatch)
// }
// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//     const token = jwt.sign({ email: 'asdfg' }, 'nodejs', { expiresIn: '7 days' })

//     console.log(token)

//     const data = jwt.verify(token, 'nodejs')
//     console.log(data)
// }
// myFunction()