$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  $("#tweetForm").on("submit", function(event) {
    event.preventDefault();
    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize()
    })
    console.log(event);
  })

  const renderTweets = function(tweets) {

    for (let item of tweets) {
      const tweetElement = createTweetElement(item);
     $("#tweets-container").prepend(tweetElement);
     }
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
  renderTweets(data);
});
