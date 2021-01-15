// importing module dependencies
const { validationResult } = require("express-validator")
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        // get id from body's request
        const { id } = req.body

        // check parameters
        if (String(id).length !== 8) {
            return res.status(400).json({ "error": "invalid ID" })
        }
        
        const { errors } = validationResult(req)
        
        if (errors.length) {
            return res.status(422).json(errors)
        }

        // try to get registers from "ngo" table
        const ngo = await connection("ngos")
            .select("name")
            .where("id", id)
            .first() // get only the first value from returned array
            .catch(error => {
                return res.json({error: error})
            })

        // check if it were returned any registers
        if (!ngo) {
            return res.status(400).json({error: `No NGOs were found with ID ${id}`})
        }

        // returns a json with the registers
        return res.json(ngo)
    }
}
