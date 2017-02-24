"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const mongo = require('mongodb');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, tweets) => {
        if (err) {
          return callback(err, false);
        }
        callback(null, true);
      });
    },

    saveLikes: function(req, callback) {
      let like = (Number(req.body.like) + 1).toString();
      if (req.body.liked === 'false'){
        like = (Number(req.body.like) - 1).toString();
      }
      var o_id = new mongo.ObjectID(req.body.id);

      db.collection("tweets").update({'_id': o_id}, {'$set': {'user.likes': like}});
      },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

  };
}
