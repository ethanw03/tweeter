$(document).ready(function() {
  const loadTweets = function() {
    $.ajax("/tweets").then(function(response) {
      renderTweets(response);
    });
  };
  loadTweets();
  $(".error").hide();

  //takes tweets input as parameter and renders
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let item of tweets) {
      const tweetElement = createTweetElement(item);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  //function to stop cross-site scripting, takes string inputted as parameter
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creates HTML for new tweets in tweetbox with heart, retweet, and like buttons
  const createTweetElement = function(tweet) {
    const $tweeter = `
      <article class="tweet-container">
        <header class="header2">
          <div class="topLeft"> <img src="${tweet.user.avatars}"> ${
  tweet.user.name
        }</div>
          ${tweet.user.handle}
        </header>
        <main class="tweet-body">
          <span class="tweet-text"
            > ${escape(tweet.content.text)}</span
          >
          <hr />
        </main>
        <footer class="bottom">
          ${timeago.format(tweet.created_at)}
          <div class="icons">
            <i id="flag" class="fa-solid fa-flag"></i> 
            <i id="retweet" class="fa-solid fa-retweet"></i>
            <i id="like" class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article> `;
    return $tweeter;
  };

  //submits new tweets as well as handles user input parameters
  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    const tweetLength = $("#tweet-text").val().trim().length;
    const charLimit = 140
    if (!tweetLength) {
      $(".error").text("Tweet box cannot be empty");
      $(".error").slideDown("slow");
      $(".error").delay(3000).slideUp("slow");

      return;
    }
    if (tweetLength > charLimit) {
      $(".error").text("Tweet cannot be more than charLimit characters‼️");
      $(".error").slideDown("slow");
      $(".error").delay(3000).slideUp("slow");

      return;
    }
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize(),
    }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
      $(".counter").text(charLimit);
    });
  });
});
