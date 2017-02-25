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
    var footerend  = `<button class="retweet"><img class="tbutton" src='http://simpleicon.com/wp-content/uploads/retweet.png'></button><button class="heart" data-like="false"><img class="tbutton" src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_corazón.svg/169px-Heart_corazón.svg.png'></button><a data-id='${htmlToPost._id}'>${htmlToPost.user.likes}</a><\/aside><\/footer></article>`;
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
    $button.on('submit', function (event) {
      event.preventDefault();
      let chars = Number($(this).children('.counter').text())
      console.log($(this).children('div').children('textarea'))
      let spaces = Number($(this).children('div').children('textarea').val().replace(/\s+/g, '').length);
      if(0 <= chars && chars < 140 && spaces){
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
      if (chars === 140 || !spaces){
        alert("Enter some Values");
      }
      if (0 >= chars) {
        alert("Too many characters");
      }
    });
  });

getTweets();

});

$(document).on('click', '.tweet .heart', function() {
  let submit = "like=" + $(this).siblings('a').text() + "&id=" + $(this).siblings('a').data('id');
  let liked =  $(this).attr("data-like");
  let likes = Number($(this).siblings('a').text())
  if(liked === "false"){
    $(this).children('img').css('opacity', 1);
    $(this).siblings('a').text(likes + 1);
    $(this).attr('data-like', true);
    submit += "&liked=true";
  } else {
    $(this).children('img').css('opacity', 0.3);
    $(this).siblings('a').text(likes - 1);
    $(this).attr('data-like', false);
    submit += "&liked=false";
  }
  $.ajax({
      url: '/tweets',
      method: 'PUT',
      data: submit,
    }).then(function(data){
    }).catch(function(err){
        console.log("Can't get tweets");
    });
});
