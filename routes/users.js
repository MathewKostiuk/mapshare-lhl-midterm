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
        if (!user) {
          res.status(400).json({message: "username and password cannot be empty"})
        } else if (bcrypt.compareSync(password, results[0].password)) {
          req.session.userId = results[0].id;
          res.status(200).json({message: "logged in"});
        } else {
          res.status(400).json({message: "username or password incorrect"});
        }
      })
  });

  // logout route

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
          res.status(400).json({message: "user with that name already exists"});
        } else if (newUser.name && newUser.password){
          db.addToTable("users", newUser)
            .then(() => {
              req.session.userId = newUser.id;
              res.status(200).json({message: "user added"});
            });
        } else {
          res.status(400).json({message: "username and email cannot be empty"});
        }
      })
  });


  return router;
};
