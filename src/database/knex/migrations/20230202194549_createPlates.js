exports.up = knex => knex.schema.createTable('plates', table => {
  table.increments('id')
  table.text('title')
  table.text('description')
  table.text('image').defaultTo(null)
  table.decimal('price')
  table.text('category')
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable('plates')