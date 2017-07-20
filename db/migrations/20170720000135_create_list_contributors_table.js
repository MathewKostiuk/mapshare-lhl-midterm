exports.up = function(knex, Promise) {
  return knex.schema.createTable('list_contributors', (table) => {
    table.integer('list_id')
    .references('id')
    .inTable('lists');
    table.integer('user_id')
    .references('id')
    .inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list_contributors');
};
