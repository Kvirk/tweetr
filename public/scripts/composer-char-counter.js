$(document).ready(function(){
  var length;
  $(".container textarea").keyup(function(){
      length = 140 - $(this).val().length;
      var $select = $(this).parent().children('.counter');
      $select.text(length);
      if(length < 0){
        $select.css("color", "red");
      } else {
        $select.css("color", "black");
      };
  });
});