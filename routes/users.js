"use strict";

const express = require('express');
const router  = express.Router();

const generateRandomString = () => {
  let output = '';
  const base = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 62);
    output += base[index];
  }
  return output;
};

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
      id: generateRandomString(),
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    db.addToTable('users', newUser);
  });

  router.post("/register", (req, res) => {
    console.log("REGISTER BUTTON TEST");
    let cookieID = req.session.user_id;
    // Check if user email already exists in database
    for (let userID in users) {
      if (users.hasOwnProperty(userID)) {
        if (users[userID].email === req.body.email) {
          res.sendStatus(400);
          //can add specific error message "User already exists"
          return;
        }
      }
    }
    // Check if email or password is left blank. Else add new user.
    if (req.body.email === '') {
      //can add error message "Please enter a valid email"
      res.sendStatus(400);
      return;
    } else if (req.body.password === '') {
      //can add error message "Please enter a valid password"
      res.sendStatus(400);
      return;
    } else {
      let hashedPassword = bcrypt.hashSync(req.body.password, 10);
      users[userKey] = {id: userKey, email: req.body.email, password: hashedPassword};
      req.session.user_id = userKey;
      res.redirect("/");
    }
  });





  return router;
};
