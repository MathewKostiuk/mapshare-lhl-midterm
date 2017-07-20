exports.up = (knex, Promise) => {
  return knex.schema.createTable('user_favourites', (table) => {
    table.integer('user_id')
    .references('id')
    .inTable('users');
    table.integer('list_id')
    .references('id')
    .inTable('lists');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_favourites');
};
