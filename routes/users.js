"use strict";

const express = require("express");
const router  = express.Router();
const bcrypt = require('bcrypt');



module.exports = (db) => {

  router.get("/", (req, res) => {
    db.viewTable("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.get("/:id", (req, res) => {
    db.findInTable("users", "id", req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/login", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    db.findInTable("users", "name", user)
      .then((results) => {

      });
    req.session.userId = id;
  });

  router.post("/register", (req, res) => {
    const newUser = {
      id: db.generateRandomString(),
      name: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    db.findInTable("users", "name", req.body.username)
      .then((results) => {
        if (results.length) {
          res.status(400).send("Sorry user with that email already exists");
        } else if (name && password){
          db.addToTable("users", newUser);
        } else {
          res.status(400).send("Email and Password cannot be empty");
        }
      })
  });


  return router;
};
