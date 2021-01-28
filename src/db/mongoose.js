const mongoose = require("mongoose");
//`${process.env.MONGODB_URL}`
//mongodb://127.0.0.1:27017/task-manager-api
mongoose
  .connect("YOUR_MONGO_URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"))
  .catch(function (err) {
    console.log("Error in DB connection");
  });
