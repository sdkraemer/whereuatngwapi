var OAuth2 = require("oauth").OAuth2;
const https = require("https");

module.exports.getTweetData = function(tweetUrl, callback) {
  buildOauth2Object().getOAuthAccessToken(
    "",
    {
      grant_type: "client_credentials"
    },
    function(e, accessToken) {
      https.get(createRequestOptionsObject(accessToken, tweetUrl), function(
        result
      ) {
        var buffer = "";
        result.setEncoding("utf8");
        result.on("data", function(data) {
          buffer += data;
        });
        result.on("end", function() {
          callback(buildTweetDataFromApiResponse(tweetUrl, buffer));
        });
      });
    }
  );
};

function createRequestOptionsObject(accessToken, tweetUrl) {
  return {
    hostname: "api.twitter.com",
    path:
      "/1.1/statuses/show.json?id=" +
      parseTweetIdFromTweetUrl(tweetUrl) +
      "&tweet_mode=extended",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  };
}

function buildTweetDataFromApiResponse(tweetUrl, response) {
  var tweet = JSON.parse(response);
  var tweetData = {
    id: tweet.id,
    text: tweet.full_text ? tweet.full_text : tweet.text,
    created_at: tweet.created_at,
    twitterUrl: tweetUrl,
    media: []
  };
  //TODO:and getting more than just the id and text into each location
  tweetData.media = pluckMediaFromTweet(tweet);
  return tweetData;
}

function pluckMediaFromTweet(tweet) {
  let tweetMedia = [];
  let tweetEntitiesObject = tweet.extended_entities
    ? tweet.extended_entities
    : tweet.entities;
  if (tweetEntitiesObject && tweetEntitiesObject.media) {
    tweetEntitiesObject.media.forEach(media => {
      var filteredMedia = {
        media_url: media.media_url,
        media_url_https: media.media_url_https
      };
      if (media.sizes) {
        filteredMedia.sizes = media.sizes;
      }
      tweetMedia.push(filteredMedia);
    });
  }
  return tweetMedia;
}

function parseTweetIdFromTweetUrl(tweetUrl) {
  var splitUrl = tweetUrl.split("/");
  return splitUrl[splitUrl.length - 1];
}

function buildOauth2Object() {
  return new OAuth2(
    process.env.TWITTER_KEY,
    process.env.TWITTER_SECRET,
    "https://api.twitter.com/",
    null,
    "oauth2/token",
    null
  );
}
