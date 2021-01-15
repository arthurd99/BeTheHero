// exports.up to create
exports.up = knex => {
    // creates a table in database with the following features
    return knex.schema.createTable('ngos', table => {
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
        table.string('id').primary()
        table.timestamp('created_at')
    })
}

// exports.down to revert operation
exports.down = knex => {
    return knex.schema.dropTable('ngos')
}
