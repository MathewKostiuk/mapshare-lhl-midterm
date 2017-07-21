"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/new", (req, res) => {
    const newItem = {
      id: db.generateRandomString(),
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.image,
      latitude: req.body.lat,
      longitude: req.body.long
    }
  })

  return router;
};
