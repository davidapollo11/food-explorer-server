exports.up = knex => knex.schema.alterTable('order_plate', table => {
  table.integer('plate_amount')
});

exports.down = knex => knex.schema.dropTable('order_plate')