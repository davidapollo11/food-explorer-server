exports.up = knex => knex.schema.createTable('order-history', table => {
  table.increments('id')
  table.integer('user_id').references('id').inTable('users')
  table.string('status')
  table.string('details')
  table.string('total_price')
  table.timestamp('created_at').defaultTo(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('order-history')