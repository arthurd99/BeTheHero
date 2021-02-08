// importing module dependencies
const { validationResult } = require("express-validator")
const connection = require("../database/connection")
const crypto = require("crypto")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) { // list all ngos existent in database
        // select all columns in "ngos" table in a
        const ngos = await connection("ngos").select()
        // returns an array of JSONs with the result
        return res.status(200).json(ngos)
    },

    async create(req, res) { // register a new ngo
        // create the following variables from JSON's body request
        const { name, email, whatsapp, city, state } = req.body
        
        // generate a random 4-byte word to be used as ID
        const id = crypto.randomBytes(4).toString("HEX")
        
        // check parameters
        const { errors } = validationResult(req)

        if (errors.length) {
            return res.status(422).json(errors)
        }

        // insert values to ngoS table
        await connection("ngos").insert({
            id, name, email, whatsapp, city, state
        }).then(_ => {
            // returns id in order to verify if it has been created
            return res.status(201).json(id)
        }).catch(error => {
            return res.status(406).json(error)
        })
    },

    async delete(req, res) {
        // get id from URL parameters
        const { id } = req.params

        // get ID from request's header
        const authId = req.headers.authorization

        // check whether are errors
        let { errors } = validationResult(req)

        if (errors.length || !authId) {
            return res.status(422).json(errors)
        }
        
        // try to get the register's id from database table
        const ngo = await connection("ngos")
            .select("id")
            .where("id", id)
            .first() // get only the first value from returned array
        
        // check if ID from parameter, from header and from database are the same
        if ((ngo.id !== authId) || (id !== authId)) {
            // returns status 401 (unauthorized) and a JSON the with error message
            return res.status(401).json({error: "Unauthorized"})
        }

        // delete register from database where id's table is the same from URL
        await connection("ngos")
            .delete()
            .where("id", id)

        // returns no content status
        return res.status(410).json({ deleted: id })
    }
}
