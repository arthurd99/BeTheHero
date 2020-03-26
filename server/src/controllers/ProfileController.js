// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) {
        const { id } = req.params

        const incidents = await connection("incidents")
            .select("*")
            .where("ong_id", id)
            .catch(err => {
                return res.status(404).json({error: err.args})
            })

        return res.status(200).json(incidents)
    }
}
