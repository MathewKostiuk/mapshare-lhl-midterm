"use strict";

require('dotenv').config();

const MAP         = process.env.API_KEY;
const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const MAP_API     = process.env.MAP_API;

const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const db          = require('./db');
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cookieSession = require("cookie-session");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const listsRoutes = require("./routes/lists");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(db.knex));

app.use(cookieSession({
  keys: ['purple', 'elephant']
}));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/items", itemsRoutes(db));
app.use("/lists", listsRoutes(db));

// Home page
app.get("/", (req, res) => {
  let templateVars = {
    MAP_API: MAP_API,
    id: req.session.userId
  }
  res.render("index", templateVars);
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
