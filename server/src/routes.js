// importing module dependencies
const router = require("express")() // import router function only
const ongController = require("./controllers/ONGController")
const incidentController = require("./controllers/IncidentController")
const profileController = require("./controllers/ProfileController")
const sessionController = require("./controllers/SessionController")

// controlling ONG routes
router.post("/ongs", ongController.create) // create new ONG
router.get("/ongs", ongController.index) // list existent ONGs
router.delete("/ongs/:id", ongController.delete) // deletes an ONG

// controlling Incident routes
router.post("/incidents", incidentController.create) // create new incidents
router.get("/incidents", incidentController.index) // list new incidents
router.delete("/incidents/:id", incidentController.delete) // delete an incident

// controlling Profile routes
router.get("/profile/:id", profileController.index) // list incidents of an ONG

// controlling Session routes
router.post("/sessions", sessionController.create) // check ONG's login

// exports module's router
module.exports = router
