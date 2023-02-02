exports.up = knex => knex.schema.createTable('order_plate', table => {
  table.increments('id')
  table.integer('plate_id').references('id').inTable('plates')
  table.integer('order_id').references('id').inTable('order_history')
});

exports.down = knex => knex.schema.dropTable('order_plate')