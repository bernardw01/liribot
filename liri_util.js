/**
 * Created by bernardwilliams on 7/11/17.
 */
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var Twitter = require('twitter');
var inq = require('inquirer');
var request = require('request');


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

    var client = new Twitter(keys.twitterKeys);

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
                    client.get('statuses/user_timeline', params, function (error, tweets, response) {
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

    var movieName = "Friday Night Lights"
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Year);
        }
    })

};

exports.dWIS = function () {
    console.log('You selected spotify this song');

}