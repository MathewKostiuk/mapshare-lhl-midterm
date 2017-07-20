"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
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
}
