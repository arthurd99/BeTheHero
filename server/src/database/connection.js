const knex = require("knex")
const config = require("../../knexfile")

// tell hnex to use the development database
module.exports = knex(config.development)
