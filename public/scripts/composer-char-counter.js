$(document).ready(function(){
  const MAX_LENGTH = 140;
  $(".container textarea").on('input', function(){
    let length = MAX_LENGTH - $(this).val().length;
    let $select = $(this).siblings('.counter');
    $select.text(length);
    $select.css("color", length < 0 ? "red" : "black");
  });
});