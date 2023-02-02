exports.up = knex => knex.schema.createTable('favorites-plates', table => {
  table.increments('id')
  table.integer('plate_id').references('id').inTable('plates')
  table.integer('user_id').references('id').inTable('users')
});

exports.down = knex => knex.schema.dropTable('favorites-plates')