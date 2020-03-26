// importing module dependencies
const express = require("express")
const ongController = require("./controllers/ONGController")
const router = express()

// controlling ONG routes
router.get("/ongs", ongController.index) // list existent ongs
router.post("/ongs", ongController.create) // create new ong

// exports module's router
module.exports = router
