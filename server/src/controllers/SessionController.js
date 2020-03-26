// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        const { id } = req.body

        const ong = await connection("ongs")
            .select("name")
            .where("id", id)
            .first()
            .catch(err => {
                return res.json({error: err})
            })

        if (!ong) {
            return res.status(400).json({error: `No ONGs were found with ID ${id}`})
        }

        return res.json(ong)
    }
}
