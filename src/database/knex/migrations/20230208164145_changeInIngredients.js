exports.up = knex => knex.schema.alterTable('plates-ingredients', table => {
  table.dropColumn('user_id')
});

exports.down = knex => knex.schema.dropTable('plates-ingredients')
