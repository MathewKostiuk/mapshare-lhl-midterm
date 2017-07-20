"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.viewTable('users')
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) =>{
    db.findInTable('users', 'id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
