exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'alice@user.com', password: '$2a$10$uA6YfZqsLtDuErOEsJ6jkOWWbcVMKNNhIi2R01NT/NrK6whWxKdnG'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'bob@user.com', password: '$2a$10$uA6YfZqsLtDuErOEsJ6jkOWWbcVMKNNhIi2R01NT/NrK6whWxKdnG'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'charlie@user.com', password: '$2a$10$uA6YfZqsLtDuErOEsJ6jkOWWbcVMKNNhIi2R01NT/NrK6whWxKdnG'})
      ]);
    });
};
