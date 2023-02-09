$(document).ready(function() {
  $("#charOverLimit").hide();
  $("#inputEmpty").hide();
  $("output").css({ color: "black" });

  //function to count characters. goes red if under 0
  const charLimit = 140
  $("textarea").on("input", function() {
    const textCounter = $(this).closest("section").find("output")[0];
    const tweetTextCount = $(this).val().length;
    textCounter.innerHTML = charLimit - tweetTextCount;
    if (textCounter.innerHTML < 0) {
      $("#charOverLimit").show();
      $("output").css({ color: "red" });
    } else {
      $("output").css({ color: "black" });
      $("#charOverLimit").hide();
    }
  });
});
