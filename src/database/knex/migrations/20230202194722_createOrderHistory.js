exports.up = knex => knex.schema.createTable('order_history', table => {
  table.increments('id')
  table.integer('user_id').references('id').inTable('users')
  table.text('status')
  table.text('details')
  table.timestamp('created_at').defaultTo(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable('order_history')