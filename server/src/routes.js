// importing module dependencies
const express = require("express")
const router = express()
const crypto = require("crypto")
const connection = require("./database/connection")

// list existent ongs
router.get("/ongs", async (req, res) => {
    const ongs = await connection("ongs").select("*")

    return res.json(ongs)
})

// create new ong
router.post("/ongs", async (req, res) => {
    const {name, email, whatsapp, city, uf} = req.body
    const id = crypto.randomBytes(4).toString("HEX")

    await connection("ongs").insert({
        id, name, email, whatsapp, city, uf
    })

    return res.json({id})
})

// exports module's router
module.exports = router
