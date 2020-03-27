// importing module dependencies
const router = require("express")() // import router function only
const ngoController = require("./controllers/NGOController")
const incidentController = require("./controllers/IncidentController")
const profileController = require("./controllers/ProfileController")
const sessionController = require("./controllers/SessionController")

// controlling ngo routes
router.post("/ngos", ngoController.create) // create new ngo
router.get("/ngos", ngoController.index) // list existent ngos
router.delete("/ngos/:id", ngoController.delete) // deletes an ngo

// controlling Incident routes
router.post("/incidents", incidentController.create) // create new incidents
router.get("/incidents", incidentController.index) // list new incidents
router.delete("/incidents/:id", incidentController.delete) // delete an incident

// controlling Profile routes
router.get("/profile", profileController.index) // list incidents of an ngo

// controlling Session routes
router.post("/sessions", sessionController.create) // check ngo's login

// exports module's router
module.exports = router
