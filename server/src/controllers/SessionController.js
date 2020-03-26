// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        // get id from body's request
        const { id } = req.body

        // try to get registers from "ong" table
        const ong = await connection("ongs")
            .select("name")
            .where("id", id)
            .first() // get only the first value from returned array
            .catch(err => {
                return res.json({error: err})
            })

        // check if it were returned any registers
        if (!ong) {
            return res.status(400).json({error: `No ONGs were found with ID ${id}`})
        }

        // returns a json with the registers
        return res.json(ong)
    }
}
