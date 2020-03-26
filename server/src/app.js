// importing module dependencies
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

// importing routes' module
const routes = require("./routes")

// set up routes
const app = express() // creates app with routes' structures
app.use(cors())
app.use(logger("dev")) // create middleware's log
app.use(express.json()) // add JSON conversor
app.use(express.urlencoded({ extended: false })) // use query string
app.use(cookieParser()) // parse HTTP request cookies

// add routes to server
app.use(routes)

// exports module
module.exports = app
