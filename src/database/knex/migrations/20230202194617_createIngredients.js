exports.up = knex => knex.schema.createTable('plates-ingredients', table => {
  table.increments('id')
  table.integer('plate_id').references('id').inTable('plates')
  table.integer('user_id').references('id').inTable('users')
  table.text('name')
});

exports.down = knex => knex.schema.dropTable('plates-ingredients')