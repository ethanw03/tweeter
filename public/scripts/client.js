$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets").then(function (response) {
      renderTweets(response);
    });
  };
  loadTweets();
  $(".error").hide();

  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
    console.log(event);
  })

  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (let item of tweets) {
      const tweetElement = createTweetElement(item);
     $("#tweets-container").prepend(tweetElement);
     }
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) {
    const $tweeter = `
      <article class="tweet-container">
        <header class="header2">
          <div class="topLeft"> <img src="${tweet.user.avatars}"> ${tweet.user.name}</div>
          ${tweet.user.handle}
        </header>
        <main class="bigBody">
          <span class="theTweet"
            > ${tweet.content.text}</span
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
      </article> `
    return $tweeter;
  }
  $("#tweetForm").on("submit", function (event) {
    event.preventDefault();
    const textBox = $("#tweet-text").val().trim().length;
    if (!textBox) {
      $(".error").text("Tweet box cannot be empty");
      $(".error").slideDown("slow")
      $(".error").delay(3000).slideUp("slow");

      return;
    }
    if (textBox > 140) {
      $(".error").text("Tweet cannot be more than 140 characters‼️");
      $(".error").slideDown("slow")
      $(".error").delay(3000).slideUp("slow");

      return;
    }
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize(),
    }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
      $(".counter").text(140);
    });
  });
});
