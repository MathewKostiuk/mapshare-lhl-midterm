exports.up = (knex, Promise) => {
  return knex.schema.createTable('user_favourites', (table) => {
    table.integer('user_id');
    table.integer('list_id');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('user_favourites');
};
