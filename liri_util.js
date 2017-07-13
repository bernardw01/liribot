/**
 * Created by bernardwilliams on 7/11/17.
 */
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var Twitter = require('twitter');
var inq = require('inquirer');


var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});


var spotify = new Spotify({
    id: 'dc34cd4a53f14b85827851ea76608ee5',
    secret: '3b029d3948e04f9283aae335250797f3'
});

exports.getSpotifyInfo = function (callback) {
    console.log('start get spotify info');
    inq
        .prompt([
            // Here we give the user a list to choose from.
            {
                type: "input",
                message: "Please type in the name of the song you would like to search for in quotes.",
                name: "songChoice"
            },
            // Here we ask the user to confirm.
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])
        .then(function (resp) {
                if (resp.confirm) {
                    //Search Spotify
                    spotify.search({type: 'track', query: resp.songChoice}, function (err, data) {
                        if (err) {
                            return console.log('Error occurred: ' + err);
                        }
                        console.log(JSON.stringify(data, null, 2));
                    });
                }
                console.log('You selected spotify this song ' + resp.songChoice);
                callback();
            }
        );
};

exports.getTwitterInfo = function (callback) {
    console.log('You selected get my tweets this song');
    inq
        .prompt([
            // Here we give the user a list to choose from.
            {
                type: "input",
                message: "Please enter your twitter username.",
                name: "twitterName"
            },
            // Here we ask the user to confirm.
            {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
            }
        ])
        .then(function (resp) {
                if (resp.confirm) {
                    var params = {screen_name: resp.twitterName};
                    client.get('statuses/user_timeline', params, function(error, tweets, response) {
                        if (!error) {
                            console.log(tweets);
                        }
                        console.log('Here are your tweets ' + JSON.stringify(tweets));
                    });
                }

                callback();
            }
        );

};

exports.getMovieInfo = function () {
    console.log('You selected spotify this song');

};

exports.dWIS = function () {
    console.log('You selected spotify this song');

}