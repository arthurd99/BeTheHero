// importing module dependencies
const express = require("express")
const ongController = require("./controllers/ONGController")
const router = express()

// list existent ongs
router.get("/ongs", ongController.index)

// create new ong
router.post("/ongs", ongController.create)

// exports module's router
module.exports = router
