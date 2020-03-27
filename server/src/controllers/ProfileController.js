// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async index(req, res) {
        // get page's parameter value. get 1 if any page param exists
        const { page = 1 } = req.query

        // get id from URL parameters
        const ngoId = req.headers.authorization // who's creating the incident

        // Counts every case in the database
        const [count] = await connection('incidents').where('ngo_id', ngoId).count()

        // try to get the register's incidents from database table
        const incidents = await connection("incidents")
            .select("*")
            .where("ngo_id", ngoId)
            .limit(5)
            .offset((page - 1) * 5)
            .catch(err => {
                // returns not found error and the corresponding message
                return res.status(404).json({error: err.args})
            })

        res.header('X-Total-Count', count['count(*)']);

        // return OK status with the incidents registers
        return res.status(200).json(incidents)
    }
}
