exports.up = knex => knex.schema.createTable('plates', table => {
  table.increments('id')
  table.string('title')
  table.string('description')
  table.string('image')
  table.string('price')
  table.string('category')
  table.integer('user_id').references('id').inTable('users')
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('plates')