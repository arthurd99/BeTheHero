// exports.up to create
exports.up = knex => {
    // creates a table in database with the following features
    return knex.schema.createTable("incidents", table => {
        table.increments() // adds an auto incrementing column called "id"
        table.string("title").notNullable()
        table.string("description").notNullable()
        table.decimal("value").notNullable()
        // creates a foreign key "ngo_id" that references the column "id" from "ngos" table
        table.string("ngo_id").notNullable()
        table.foreign("ngo_id").references("id").inTable("ngos")
    })
}

// exports.down to revert operation
exports.down = function(knex) {
    return knex.schema.dropTable("incidents")
}
