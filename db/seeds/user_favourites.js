
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_favourites').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_favourites').insert([
        {list_id: 1, user_id: 2},
        {list_id: 1, user_id: 3},
        {list_id: 3, user_id: 2},
        {list_id: 2, user_id: 2},
      ]);
    });
};
