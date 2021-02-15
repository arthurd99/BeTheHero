// exports.up to create
exports.up = knex => {
    // creates a table in database with the following features
    return knex.schema.createTable('incidents', table => {
        table.increments() // adds an auto incrementing column called 'id'
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        // creates a foreign key 'ngo_id' that references the column 'id' from 'ngos' table
        table.string('ngo_id').notNullable()
        table.foreign('ngo_id')
            .references('id')
            .inTable('ngos')
            .onDelete('CASCADE')
    })
}

// exports.down to revert operation
exports.down = knex => {
    return knex.schema.dropTable('incidents')
}
