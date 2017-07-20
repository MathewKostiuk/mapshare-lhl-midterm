exports.up = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.string('email');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.table('users', (table) => {
    table.dropColumn('email');
  });
};
