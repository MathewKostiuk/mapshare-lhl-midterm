"use strict";

require("dotenv").config();

const MAP_API     = process.env.MAP_API;
const express = require("express");
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {


  router.get("/", (req, res) => {
    let templateVars = {
      MAP_API: MAP_API
    }
    res.render("index", templateVars);
  });


  return router;
};
