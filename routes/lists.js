"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get('/:id', (req, res) => {
    db.findInTable('items', 'list_id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
