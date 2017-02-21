$(document).ready(function(){
  var length;
  $(".container textarea").keyup(function(){
      length = 140 - $(this).val().length;
      $(".container .counter").text(length);
      if(length < 0){
        $(".container .counter").css("color", "red");
      } else {
        $(".container .counter").css("color", "black");
      };
  });
});