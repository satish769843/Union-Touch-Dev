const express = require("express")
const app = express()
const bodyParser = require("body-parser")
require("dotenv").config()
const ConnectDB = require("./config/Database")
ConnectDB()
const PORT = process.env.PORT || 5000
app.use("/upload", express.static("upload"))
// Body-Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Route
app.use("/api/admin", require("./api/route/admin"))
app.use("/api/user/", require("./api/route/user"))
app.use("/api/category", require("./api/route/category"))
app.use("/api/provider", require("./api/route/provider"))

//
app.listen(PORT, () => console.log(`Server is Running on PORT - ${PORT}`))
