exports.up = knex => knex.schema.alterTable('order_history', table => {
  table.decimal('total_price')
});

exports.down = knex => knex.schema.dropTable('order_history')
