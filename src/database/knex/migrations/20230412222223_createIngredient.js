exports.up = knex => knex.schema.createTable('ingredients', table => {
  table.increments('id')
  table.string('name')
  table.integer('user_id').references('id').inTable('users')
  table.integer('plate_id').references('id').inTable('plates')
})

exports.down = knex => knex.schema.dropTable('ingredients')
