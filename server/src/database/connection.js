const knex = require("knex")
const config = require("../../knexfile")

// tells hnex to use the development database
module.exports = knex(config.development)
