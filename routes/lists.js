"use strict";

const express = require("express");
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.viewTable("lists")
      .then((response) => {
        res.json(response);
      });
  });

  // get favourite lists
  router.get("/favourites", (req, res) => {
    db.findInTable("user_favourites", "user_id", req.params.userId)
      .then((response) => {
        const lists = [];
        return new Promise((resolve, reject) => {
          for (row in response) {
            db.findInTable("lists", "id", row.list_id)
              .then((response) => {
                lists.push(response);
              });
          }
        }).then(() => {
          res.json(lists);
        });
      });
  });

  // get your lists


  // get contributions


  router.get("/:id", (req, res) => {
    db.findInTable("items", "list_id", req.params.id)
      .then((response) => {
        res.json(response);
      });
  });

  router.post("/new", (req, res) => {
    const newList = {
      id: db.generateRandomString(),
      name: req.body.name,
      creator_id: req.session.userId
    };
    db.addToTable("lists", newList);
  });

  return router;
};
