exports.up = (knex, Promise) => {
  return knex.schema.createTable('lists', (table) => {
    table.increments();
    table.string('name');
    table.integer('creator_id')
    .references('id')
    .inTable('users');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('lists');
};
