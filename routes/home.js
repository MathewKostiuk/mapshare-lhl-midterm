"use strict";

require("dotenv").config();

const MAP_API     = process.env.MAP_API;
const express = require("express");
const router  = express.Router();
const bcrypt = require("bcrypt");
const nav = require("../public/scripts/nav-toggle-hide");

module.exports = (db) => {


  router.get("/", (req, res) => {
    let templateVars = {
      MAP_API: MAP_API,
      id: req.session.userId
    }
    // nav.toggleButtons(req.session.userId);
    res.render("index", templateVars);
  });


  return router;
};
