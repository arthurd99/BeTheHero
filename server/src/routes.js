// importing module dependencies
const express = require("express")
const router = express()

// add route to router
router.get('/', (req, res) => {
    res.json({
        name: "Arthur Diniz",
        message: "Hello, World!"
    })
})

// exports module's router
module.exports = router
