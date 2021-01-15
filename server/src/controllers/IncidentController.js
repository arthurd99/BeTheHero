// importing module dependencies
const { validationResult } = require("express-validator")
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        // create the following variables from JSON's body request
        const { title, description, value } = req.body
        // get ID from request's header
        const authId = req.headers.authorization // who's creating the incident

        // check parameters
        const { errors } = validationResult(req)
        
        if (errors.length) {
            return res.status(422).json(errors)
        }

        // get ID from database inserted register array
        const [ id ] = await connection("incidents").insert({
            title,
            description,
            value,
            ngo_id: authId,
            created_at: Date.now(),
            updated_at: Date.now()
        })

        // return ID from created incident
        return res.json({ id })
    },

    async index(req, res) {
        // get page's parameter value. get 1 if any page param exists
        const { page = 1 } = req.query
        // get the amount of register existent in "incident"'s and get only the JSON
        const [count] = await connection("incidents").count()
        // amount of registers per page
        const limPage = 5

        // get incidents data gathered with ngo's data table
        const incidents = await connection("incidents")
            .select([
                "incidents.*", // select all columns from incident's table
                // filter selected from ngos' table
                "ngos.name",
                "ngos.email",
                "ngos.whatsapp",
                "ngos.city",
                "ngos.uf"
            ])
            // join "ngos" columns table with "incident" columns table through their primary/foreign keys
            .join("ngos", "ngos.id", "=", "incidents.ngo_id")
            // limits amount of data per page
            .limit(limPage)
            // first positon out of the amount selected to be returned from database
            .offset((page - 1) * limPage)

        /* when making pagination, the amount of items in database
        is sent to front-end through the response's header */
        res.header("X-Total-Count", count["count(*)"])

        // returns the JSON with the selected amount registers
        return res.json(incidents)
    },

    async delete(req, res) {
        // get id from URL parameters
        const { id } = req.params
        // get ID from request's header
        const ngoId = req.headers.authorization
        // try to get the incidents from database table
        const incident = await connection("incidents")
            .select("ngo_id")
            .where("id", id)
            .first() // get only the first value from returned array

        // check if ID from header and from database are the same
        if (incident.ngo_id !== ngoId) {
            // returns status 401 (unauthorized) and a JSON the with error message
            return res.status(401).json({error: "Operation not allowed"})
        }

        // delete register from database where id's table is the same from URL
        await connection("incidents")
            .where("id", id)
            .delete()

        // returns no content status
        return res.status(204).send()
    }
}
