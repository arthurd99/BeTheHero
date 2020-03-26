// exports.up to create
exports.up = knex => {
    // creates a table in database with the following features
    return knex.schema.createTable("ongs", table => {
        table.string("id").primary()
        table.string("name").notNullable()
        table.string("email").notNullable()
        table.string("whatsapp").notNullable()
        table.string("city").notNullable()
        table.string("uf", 2).notNullable()
    })
}

// exports.down to revert operation
exports.down = knex => {
    return knex.schema.dropTable("ongs")
}
