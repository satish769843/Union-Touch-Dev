const mongoose = require("mongoose")
// console.log(process.env.MONGO_PWD)
const ConnectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://node-user:${process.env.MONGO_PWD}@satish.f113j.mongodb.net/uniontouch?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    )
    console.log("DataBase Connect...")
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = ConnectDB
