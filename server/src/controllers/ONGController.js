// importing module dependencies
const crypto = require("crypto")
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) { // list all ONGs existent on database
        const ongs = await connection("ongs").select("*")
        return res.json(ongs)
    },

    async create(req, res) { // register a new ONG
        // filter data from request
        const {name, email, whatsapp, city, uf} = req.body
        // generate a random 4-byte word to be the ID
        const id = crypto.randomBytes(4).toString("HEX")

        // insert values to ONGS table
        await connection("ongs").insert({
            id, name, email, whatsapp, city, uf
        })

        // returns id in order to verify if it has been created
        return res.json({id})
    },

    async delete(req, res) {
        const { id } = req.params
        const authId = req.headers.authorization
        const ong = await connection("ongs")
            .select("id")
            .where("id", id)
            .first()

        if ((ong.id !== authId) || (id !== authId)) {
            return res.status(401).json({error: "Operation not allowed"})
        }

        await connection("ongs")
            .delete()
            .where("id", id)

        return res.status(204).send()
    }
}
