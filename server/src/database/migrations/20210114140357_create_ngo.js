// exports.up to create
exports.up = knex => {
    // creates a table in database with the following features
    return knex.schema.createTable('ngos', table => {
        table.string('id').primary().unique()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('whatsapp').notNullable().unique()
        table.string('city').notNullable()
        table.string('state', 2).notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

// exports.down to revert operation
exports.down = knex => {
    return knex.schema.dropTable('ngos')
}
