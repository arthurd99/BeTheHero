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

        const { page = 1 } = req.query
        const [count] = await connection("incidents").count()
        const limPage = 5

        const incidents = await connection("incidents")
            .select([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"
            ])
            .join("ongs", "ongs.id", "=", "incidents.ong_id") // gather registers from different tables
            .limit(limPage)
            .offset((page - 1) * limPage)

        /* when making pagination, the amount of items in database
        is sent to front-end through the response's header */
        res.header("X-Total-Count", count["count(*)"])

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
