var fs = require("fs");
//var splash = require('./splash');
var utl = require('./liri_util');
var inq = require('inquirer');
var quit = false;

fs.readFile("random.txt", "utf8", function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }
    //console.log(data);
    var dataArr = data.split(",");
    //console.log(dataArr);
});

function showMenu() {

    //console.log(splash.splash);
    if (!quit){
        inq
            .prompt([
                // Here we give the user a list to choose from.
                {
                    type: "list",
                    message: "Which command would you like to run?",
                    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says", "Quit!"],
                    name: "commandChoice"
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

                switch (resp.commandChoice) {
                    case 'my-tweets':
                        utl.getTwitterInfo(showMenu);
                        break;
                    case 'spotify-this-song':
                        utl.getSpotifyInfo(showMenu);
                        break;
                    case 'movie-this':
                        utl.getMovieInfo(showMenu);
                        break;
                    case 'do-what-it-says':

                        break;
                    case 'Quit!':
                        quit = true;
                        break;
                    default:
                        quit = true;
                }
            });
    }
    };


showMenu();

/*var splash = '| |    |_   _|  __ \|_   _| |  _ \      | |
 | |      | | | |__) | | |   | |_) | ___ | |_
 | |      | | |  _  /  | |   |  _ < / _ \| __|
 | |____ _| |_| | \ \ _| |_  | |_) | (_) | |_
 |______|_____|_|  \_\_____| |____/ \___/ \__|' */