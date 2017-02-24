"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const mongo = require('mongodb');
const db = mongo.MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;



module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put("/", function(req, res){
    if (!req.body.like || !req.body.id || !req.body.liked) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    let like = (Number(req.body.like) + 1).toString();
    if (req.body.liked === 'false'){
      like = (Number(req.body.like) - 1).toString();
    }
    var o_id = new mongo.ObjectID(req.body.id);
    db.connect(MONGODB_URI, (err, tweeter) => {
       tweeter.collection("tweets").update({'_id': o_id}, {'$set': {'user.likes': like}});
       tweeter.close();
    });
    res.status(201).send();
  });

  return tweetsRoutes;

}
