// importing module dependencies
const connection = require("../database/connection")

// exports a JSON object with routes' actions
module.exports = {
    async create(req, res) {
        const { title, description, value } = req.body
        const ongId = req.headers.authorization // who's creating the incident

        const [ id ] = await connection("incidents").insert({
            title, description, value, ong_id: ongId
        }).catch(err => {
            console.log(err)
        })

        return res.json({ id })
    },

    async index(req, res) {
        const incidents = await connection("incidents").select("*")

        return res.json(incidents)
    },

    async delete(req, res) {
        const { id } = req.params
        const ongId = req.headers.authorization
        const incident = await connection("incidents")
            .select("ong_id")
            .where("id", id)
            .first()

        if (incident.ong_id !== ongId) {
            return res.status(401).json({error: "Operation not allowed"})
        }

        await connection("incidents").where("id", id).delete()

        return res.status(204).send()
    }
}
