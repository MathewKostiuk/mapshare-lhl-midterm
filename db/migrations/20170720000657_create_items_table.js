exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.string('image_url');
    table.integer('list_id')
    .references('id')
    .inTable('lists');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
