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

  router.get("/:id", (req, res) => {
    db.findInTable('users', 'id', req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/login/:name", (req, res) => {
    db.findInTable('users', 'name', req.params.name)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/register", (req, res) => {
    const newUser = {
      id: db.generateRandomString(),
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    db.addToTable('users', newUser);
  });


  return router;
};
