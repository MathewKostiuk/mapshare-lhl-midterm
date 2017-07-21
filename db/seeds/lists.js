exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('lists').del()
    .then(() => {
      // Inserts seed entries
      return knex('lists').insert([
        {id: 1, name: 'pizza places', creator_id: 1},
        {id: 2, name: 'haunted houses', creator_id: 3},
        {id: 3, name: 'best happy hours', creator_id: 1}
      ]);
    });
};
