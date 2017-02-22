/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  function calTimePass(time){
    var currentDate = new Date();
    var timeLeft = currentDate - time;
    var result;
    if(timeLeft > 60){
      timeLeft /= 60;
      result = Math.floor(timeLeft) + " mins ago";
    }
    if(timeLeft > 60){
      timeLeft /= 60;
      result = Math.floor(timeLeft) + " hours ago";
    }
    if(timeLeft > 24){
      timeLeft /= 24;
      result = Math.floor(timeLeft) + " days ago";
    }
    if(timeLeft > 365.25){
      timeLeft /= 365.25;
      result = Math.floor(timeLeft) + " year ago";
    } else {
      result = Math.floor(timeLeft) + " seconds ago";
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

  $.ajax({
    dataType: "json",
    url: '/tweets',
    method: 'GET',
  }).then(function(tweets){
    renderTweets(tweets);
  }).catch(function(err){
    console.log("Can't get tweets");
  });
});

