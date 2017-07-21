"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    db.findInTable('items', 'id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/new", (req, res) => {
    console.log(req.body.name);
    const newItem = {
      id: db.generateRandomString(),
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image,
      latitude: req.body.lat,
      longitude: req.body.long
    };
    db.addToTable('items', newItem);
  });

  return router;
};
