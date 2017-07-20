exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, name: 'Pizza Palace', description: 'it\'s pizza...', image_url: '', list_id: 1},
        {id: 2, name: 'Haunted Hotel', description: 'it\'s haunted!', image_url: '', list_id: 2},
        {id: 3, name: 'The Guild', description: 'cheap food and decent drinks', image_url: '', list_id: 3},
        {id: 4, name: 'second slice', description: 'garbage but cheap', image_url: '', list_id: 1},
        {id: 5, name: 'pizza pizza', description: 'food food', image_url: '', list_id: 1},
        {id: 6, name: 'Spadina House', description: 'old ass house', image_url: '', list_id: 2},
        {id: 7, name: 'Cenotes', description: 'underground drinks', image_url: '', list_id: 3},
        {id: 8, name: 'Plutos', description: 'dive diner', image_url: '', list_id: 3},
        {id: 9, name: 'Prima Strada', description: 'neopolitan pizza', image_url: '', list_id: 1}
      ]);
    });
};
