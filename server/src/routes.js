// importing module dependencies
const router = require('express')() // import router function only
const { body } = require('express-validator')
const ngoController = require('./controllers/NGOController')
const incidentController = require('./controllers/IncidentController')
const profileController = require('./controllers/ProfileController')
const sessionController = require('./controllers/SessionController')

// controlling ngo routes
router.post(
    '/ngos',
    [ // check if each field's request body is valid
        body('login')
            .isString()
            .isLength({ min: 4, max: 16 }),
        body('password')
            .isString()
            .isLength({ min: 8, max: 64 }),
        body('name')
            .isString()
            .isLength({ min: 4, max: 32 }),
        body('email')
            .isEmail()
            .isLength({ max: 32 }),
        body('whatsapp')
            .isMobilePhone()
            .isNumeric()
            .isLength({ max: 16 }),
        body('city')
            .isString()
            .isLength({ min: 2, max: 32 }),
        body('state')
            .isString()
            .isAlpha()
            .isLength(2)
    ],
    ngoController.create
) // create new ngo
router.get('/ngos', ngoController.index) // list existent ngos
router.delete('/ngos/:id', ngoController.delete) // deletes an ngo

// controlling Incident routes
router.post(
    '/incidents',
    [
        body('title')
            .isLength({ min: 4, max: 32 }),
        body('description')
            .isLength({ min: 4, max: 512 }),
        body('value')
            .isLength({ min: 1, max: 8 }).withMessage('Monetary value not allowed')
            .isNumeric()
    ],
    incidentController.create
) // create new incidents
router.get('/incidents', incidentController.index) // list new incidents
router.delete('/incidents/:id', incidentController.delete) // delete an incident

// controlling Profile routes
router.get('/profile', profileController.index) // list incidents of an ngo

// controlling Session routes
router.post(
    '/sessions',
    [
        body('login')
            .isLength({ min: 4, max: 16 }),
        body('password')
            .isLength({ min: 8, max: 64 })
    ],
    sessionController.create
) // check ngo's login

// exports module's router
module.exports = router
