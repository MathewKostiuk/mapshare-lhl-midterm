exports.up = function(knex, Promise) {
  return knex.schema.createTable('list_contributors', (table) => {
    table.integer('list_id');
    table.integer('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list_contributors');
};
