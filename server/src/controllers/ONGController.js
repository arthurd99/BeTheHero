// importing module dependencies
const crypto = require("crypto")
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) { // list all ONGs existent in database
        // select all columns in "ongs" table in a
        const ongs = await connection("ongs").select("*")
        // returns an array of JSONs with the result
        return res.json(ongs)
    },

    async create(req, res) { // register a new ONG
        // create the following variables from JSON's body request
        const {name, email, whatsapp, city, uf} = req.body
        // generate a random 4-byte word to be used as ID
        const id = crypto.randomBytes(4).toString("HEX")

        // insert values to ONGS table
        await connection("ongs").insert({
            id, name, email, whatsapp, city, uf
        })

        // returns id in order to verify if it has been created
        return res.json({id})
    },

    async delete(req, res) {
        // get id from URL parameters
        const { id } = req.params
        // get ID from request's header
        const authId = req.headers.authorization
        // try to get the register's id from database table
        const ong = await connection("ongs")
            .select("id")
            .where("id", id)
            .first() // get only the first value from returned array

        // check if ID from parameter, from header and from database are the same
        if ((ong.id !== authId) || (id !== authId)) {
            // returns status 401 (unauthorized) and a JSON the with error message
            return res.status(401).json({error: "Unauthorized"})
        }

        // delete register from database where id's table is the same from URL
        await connection("ongs")
            .delete()
            .where("id", id)

        // returns no content status
        return res.status(204).send()
    }
}
