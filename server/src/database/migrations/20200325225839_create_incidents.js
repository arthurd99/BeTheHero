// exports.up to create
exports.up = knex => {
    return knex.schema.createTable("incidents", table => {
        table.increments() // adds an auto incrementing column
        table.string("title").notNullable()
        table.string("description").notNullable()
        table.decimal("value").notNullable()
        table.string("ong_id").notNullable()
        // creates a foreign key "ong_id" that references the column "id" from "ongs" table
        table.foreign("ong_id").references("id").inTable("ongs")
    })
}

// exports.down to revert
exports.down = function(knex) {
    return knex.schema.dropTable("incidents")
}
