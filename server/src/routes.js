// importing module dependencies
const express = require("express")
const ongController = require("./controllers/ONGController")
const incidentController = require("./controllers/IncidentController")
const profileController = require("./controllers/ProfileController")
const router = express()

// controlling ONG routes
router.get("/ongs", ongController.index) // list existent ongs
router.post("/ongs", ongController.create) // create new ong
router.delete("/ongs/:id", ongController.delete) // deletes an ong

// controlling Incident routes
router.get("/incidents", incidentController.index)
router.post("/incidents", incidentController.create)
router.delete("/incidents/:id", incidentController.delete)

// controlling Profile routes
router.get("/profile/:id", profileController.index)

// exports module's router
module.exports = router
