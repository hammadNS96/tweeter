//Loads and renders tweets that are inputed in

$(document).ready(function () {
  //Posts tweet 
  $("#submitTweet").submit(function (event) {
    event.preventDefault()
    let values = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: values,
      success: () => {
        console.log("completed POST");
        $('.text').val("");
        loadTweet();
      }
    });
  });

  //Gets tweet and runs it through a markup
  const loadTweet = function () {
    $('#tweets-container').empty();
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (responseJSON) => {
        console.log("completed GET");
        renderTweet(responseJSON);
      }
    });
  };

  //loops through tweet arrays and calls  a callback
  const renderTweet = function (arr) {
    for (let i of arr) {
      createTweetElement(i);
    }
  };


  //The html markup that will be shown
  const createTweetElement = function (i) {
    //For security against code injections
    const escape = function (str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //To find the time
    const time = function (time) {
      let date = new Date(time * 1000);
      let hour = date.getHours();
      let min = "0" + date.getMinutes();
      let sec = "0" + date.getSeconds();
      return hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
    }

    const safeHTML = `<p>${escape(i.content.text)}</p>`

    let markup = `
<article class="tweetstyle">
    <footer>
      <img class="profilePic" src="${i.user.avatars}">
      <div>${i.user.name}</div>
      <div class="hashtag">${i.user.handle}</div>
    </footer>
    <div class="content">
      ${safeHTML}
    </div>
    <div class="time">
      ${time(i.created_at)}
    </div>

  </article>
  `;
    $('#tweets-container').prepend(markup);
  };

  loadTweet();
});