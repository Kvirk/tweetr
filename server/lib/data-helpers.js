"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.connect(MONGODB_URI, (err, tweeter) => {
          if (err) {
            console.error(`Failed to connect: ${MONGODB_URI}`);
            return callback(err, false);
          }
          tweeter.collection("tweets").insertOne(newTweet, (err, tweets) => {
            if (err) {
              return callback(err, false);
            }
            callback(null, true);
          });
          tweeter.close();
      });

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.connect(MONGODB_URI, (err, tweeter) => {
          if (err) {
            console.error(`Failed to connect: ${MONGODB_URI}`);
            return callback(err);
          }
          tweeter.collection("tweets").find().toArray((err, tweets) => {
            if (err) {
              return callback(err);
            }
            callback(null, tweets);
          });
          tweeter.close();
      });
    }

  };
}
