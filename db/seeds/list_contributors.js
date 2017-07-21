
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list_contributors').del()
    .then(function () {
      // Inserts seed entries
      return knex('list_contributors').insert([
        {list_id: 1, user_id: 2},
        {list_id: 1, user_id: 3},
        {list_id: 3, user_id: 1}
      ]);
    });
};
