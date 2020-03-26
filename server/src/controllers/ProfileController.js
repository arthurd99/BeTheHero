// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) {
        // get id from URL parameters
        const { id } = req.params

        // try to get the register's incidents from database table
        const incidents = await connection("incidents")
            .select("*")
            .where("ong_id", id)
            .catch(err => {
                // returns not found error and the corresponding message
                return res.status(404).json({error: err.args})
            })

        // return OK status with the incidents registers
        return res.status(200).json(incidents)
    }
}
