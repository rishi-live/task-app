const mongoose = require('mongoose');

//mongodb://127.0.0.1:27017/task-manager-api 
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})