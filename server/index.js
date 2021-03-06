"use strict";

// Basic express setup:
require('dotenv').config();
const PORT          = process.env.PORT || 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const mongo = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
const db = mongo.MongoClient;

const sassMiddleware = require('node-sass-middleware');
const path = require('path');
console.log(path.join(__dirname, '../public/styles'))
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, '../public/'),
    dest: path.join(__dirname, '../public/'),
    debug: true,
    outputStyle: 'compressed',
}));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
db.connect(MONGODB_URI, (err, db) => {
          if (err) {
            console.error(`Failed to connect: ${MONGODB_URI}`);
            return callback(err, false);
          }
  const DataHelpers = require("./lib/data-helpers.js")(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);



  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });

});