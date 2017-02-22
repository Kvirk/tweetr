/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function calTimePass(time){
  var currentDate = new Date();
  var timeLeft = currentDate - time;
  var result;
  if(timeLeft > 60){
    timeLeft /= 60;
    result = Math.floor(timeLeft) + " seconds ago";
  }
  if(timeLeft > 60){
    timeLeft /= 60;
    result = Math.floor(timeLeft) + " minutes ago";
  }
  if(timeLeft > 60){
    timeLeft /= 60;
    result = Math.floor(timeLeft) + " hours ago";
  }
  if(timeLeft > 24){
    timeLeft /= 60;
    result = Math.floor(timeLeft) + " days ago";
  }
  if(timeLeft > 365.25){
    timeLeft /= 60;
    result = Math.floor(timeLeft) + " years ago";
  }

  return result;
}

function createTweetElement(htmlToPost){
  var resultHeader =  `<article class='tweet'><header><img class='userpix' src='${htmlToPost.user.avatars.regular}'><h2>${htmlToPost.user.name}<\/h2><p class='handle'>${htmlToPost.user.handle}<\/p><\/header>`
  var main =  `<main><p>${htmlToPost.content.text}<\/p><\/main>`;
  var footerstart = `<footer><p class='date'>${calTimePass(htmlToPost.created_at)}<\/p><aside><button class="report"><img class="tbutton" src='https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-129_flag-512.png'></button>`;
  var footerend  = `<button class="retweet"><img class="tbutton" src='http://simpleicon.com/wp-content/uploads/retweet.png'></button><button class="heart"><img class="tbutton" src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_corazón.svg/169px-Heart_corazón.svg.png'></button><\/aside><\/footer></article>`;
  var result = resultHeader + main + footerstart + footerend;
  return result;
}

function renderTweets(tweets) {
  for(let i = 0; i < tweets.length; i++){
    $('.tweets').append(createTweetElement(tweets[i]));
  }
}

renderTweets(data);

});

