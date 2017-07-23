"use strict";

const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    db.findInTable("items", "id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/new", (req, res) => {
    console.log(req.body);
    const newItem = {
      id: db.generateRandomString(),
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.img,
      latitude: req.body.lat,
      longitude: req.body.long,
      list_id: req.body.list_id
    };
    db.addToTable('items', newItem);
  });

  router.post("/:id", (req, res) => {
    const newItem = {
      name: req.body.name,
      description: req.body.description,
      image_url: req.body.img
    };
    const check = ["id", req.body.id];
    db.updateTable("items", check, newItem);
  });

  return router;
};
