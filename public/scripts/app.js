/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  function calTimePass(time){
    var currentDate = new Date();
    var seconds = (currentDate - time) / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365.25;
    var result = Math.floor(years) + " years ago";

    if(days < 365.25){
      result = Math.floor(days) + " days ago";
    }
    if(hours < 24){
      result = Math.floor(hours) + " hours ago";
    }
    if(minutes < 60){
      result = Math.floor(minutes) + " minutes ago";
    }
    if(seconds < 60){
      result = seconds + " seconds ago";
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
      $('.tweets').prepend(createTweetElement(tweets[i]));
    }
  }

  function updateTweet(tweets){
    $.ajax({
      dataType: "json",
      url: '/tweets',
      method: 'GET',
      }).then(function(tweets){
        $('.tweets').prepend(createTweetElement(tweets[tweets.length - 1]));
      }).catch(function(err){
        console.log("Can't get tweets");
    });
  }

  function getTweets(){
    $.ajax({
      dataType: "json",
      url: '/tweets',
      method: 'GET',
      }).then(function(tweets){
        renderTweets(tweets);
      }).catch(function(err){
        console.log("Can't get tweets");
    });
  }
  $('.new-tweet').slideUp("fast");

  $('#nav-bar button').click(function() {
    $('.new-tweet').slideToggle( "slow", function() {
      $('.new-tweet textarea').focus();
    });
  });

  $(function() {
    let $button = $('.container form');

    $button.on('submit', function () {
      event.preventDefault()
      let chars = Number($(this).children('.counter').text())
      if(0 <= chars && chars < 140){
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $button.serialize(),
        }).then(function(data){
            updateTweet();
        }).catch(function(err){
            console.log("Can't get tweets");
          });
      }
      if (chars === 140){
        alert("Enter some Values");
      }
      if (0 >= chars) {
        alert("Too many characters");
      }
    });
  });

getTweets();

});

