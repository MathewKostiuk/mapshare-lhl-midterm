exports.up = function(knex, Promise) {
  return knex.schema.table('items', (table) => {
    table.integer('latitude');
    table.integer('longitude');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('items', (table) => {
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  })
};
