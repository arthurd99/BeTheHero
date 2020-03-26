// importing module dependencies
const express = require("express")
const cors = require("cors")
const logger = require("morgan")
const cookieParser = require("cookie-parser")

// importing routes' module
const routes = require("./routes")

// setting up routes
const app = express() // create app with routes' structures
app.use(cors())  // control access permissions in URLs
app.use(logger("dev")) // create middleware's log
app.use(express.json()) // add JSON conversor
app.use(express.urlencoded({ extended: false })) // use query string
app.use(cookieParser()) // parse HTTP request cookies

// add routes to server
app.use(routes)

// exports module
module.exports = app
