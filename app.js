const express = require("express");
const app = express();
const path = require("path");
const https = require("https");
const bodyParser = require("body-parser");

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


app.use(bodyParser.urlencoded({extend:true}));
app.use(express.static(path.join(__dirname,"/")));
app.set('view engine', 'ejs');




app.get("/", function(req,res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/index.html", function(req,res){

  var randomPage = Math.floor(Math.random() * 500);


  const apiKey = "2335a5deca22810c0a6ef81221ac0379";
  var url = "";
  var genre = genreToID(req.body.genre);
  var yearLow = (req.body.yearLow);
  var yearHigh = (req.body.yearHigh);
  var maxDate = yearHigh + "-01-01";
  var minDate = yearLow + "-01-01";



//   if (yearLow === null && yearHigh === null){
    url = "https://api.themoviedb.org/3/discover/movie?api_key=" +
    apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+ page +"&with_genres="
    + genre;
//   }
//   else if (yearLow === null || yearHigh === null){
//     url = "https://api.themoviedb.org/3/discover/movie?api_key=" +
//     apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+ page +"&with_genres="
//     + genre;
//   }
//
// else {
//   url = "https://api.themoviedb.org/3/discover/movie?api_key=" +
//   apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page="+ page +"&with_genres="
//   + genre + "&primary_release_date.lte=" + maxDate + "&primary_release_date.gte=" + minDate;
// }
  var page = randomPage;



  https.get(url, function(response){
    //console.log(response);

     var chunks = [];
    response.on("data", function(data){
      chunks.push(data);
    }).on('end', function() {
      var data = Buffer.concat(chunks);
      var movieData = JSON.parse(data);

     //  if(page > movieData.total_pages){
     //    page = movieData.total_pages;
     //    https.get(url, function(response){
     //
     //      var chunks = [];
     //      response.on("data", function(data){
     //       chunks.push(data);
     //      }).on('end', function() {
     //       var data = Buffer.concat(chunks);
     //       var movieData = JSON.parse(data);
     //       var randomMoviePick = Math.floor(Math.random() * 20);
     //
     //       var firstMovie = movieData.results[randomMoviePick].title;
     //       var movieDescription = movieData.results[randomMoviePick].overview;
     //       var year = movieData.results[randomMoviePick].release_date;
     //       year = year.slice(0,4);
     //       var movieID = movieData.results[0].id;
     //       var picLink = "https://image.tmdb.org/t/p/w500/" + movieData.results[randomMoviePick].poster_path;
     //       console.log(firstMovie);
     //       console.log("how many movies listed" + movieData.results.length);
     //       console.log(movieDescription);
     //       console.log(picLink);
     //       console.log(year.slice(0,4));
     //       console.log("the years range from " + minDate + " to " + maxDate);
     //       console.log("number of pages + " + movieData.total_pages);
     //       // console.log(movieID);
     //       //console.log(randomNumber);
     //       //console.log(genre);
     //
     //       res.render('result', {
     //         movieTitle: firstMovie,
     //         description: movieDescription,
     //         picture: picLink,
     //         year: year
     //         });
     //
     // });
     //         });
     //
     //  }


      var randomMoviePick = Math.floor(Math.random() * 20);
      var firstMovie = movieData.results[randomMoviePick].title;
      var movieDescription = movieData.results[randomMoviePick].overview;
      var year = movieData.results[randomMoviePick].release_date;
      year = year.slice(0,4);
      var movieID = movieData.results[0].id;
      var picLink = "https://image.tmdb.org/t/p/w500/" + movieData.results[randomMoviePick].poster_path;
      console.log(firstMovie);
      console.log("how many movies listed" + movieData.results.length);
      console.log(movieDescription);
      console.log(picLink);
      console.log(year.slice(0,4));
      console.log("the years range from " + minDate + " to " + maxDate);
      console.log("number of pages + " + movieData.total_pages);
      console.log(randomMoviePick);
      // console.log(movieID);
      //console.log(randomNumber);
      //console.log(genre);

      res.render('result', {
        movieTitle: firstMovie,
        description: movieDescription,
        picture: picLink,
        year: year
        });

});
        });

   });




$('#something').click(function() {
  $('#form-something').submit();
});






function genreToID(genre) {

  switch(genre) {

    case "action" :

    genre = "28";
    return genre;
    break;

    case "adventure" :

    genre = "12";
    return genre;
    break;

    case "comedy" :

    genre = "35";
    return genre;
    break;

    case "crime" :

    genre = "80";
    return genre;
    break;

    case "documentary" :

    genre = "99";
    return genre;
    break;

    case "drama" :

    genre = "18";
    return genre;
    break;

    case "family" :

    genre = "10751";
    return genre;
    break;

    case "fantasy" :

    genre = "14";
    return genre;
    break;

    case "history" :

    genre = "36";
    return genre;
    break;

    case "horror" :

    genre = "27";
    return genre;
    break;

    case "music" :

    genre = "10402";
    return genre;
    break;

    case "mystery" :

    genre = "9648";
    return genre;
    break;

    case "romance" :

    genre = "10749";
    return genre;
    break;

    case "sci-fi" :

    genre = "878";
    return genre;
    break;

    case "thriller" :

    genre = "53";
    return genre;
    break;

    case "war" :

    genre = "10752";
    return genre;
    break;

    case "western" :

    genre = "37";
    return genre;
    break;


  }
}


//   var castURL = "https://api.themoviedb.org/3/movie/" + movieID + "credits?api_key=" + apiKey;
//   https.get(castURL, function(response2){
//
//   response2.on("d", function(d){
//
//     var castData = JSON.parse(d);
//     var cast = [];
//     for (var m = 0; m <= 7; m++){
//       cast.push(castData.cast[m].name);
//     }
//
//     console.log(cast);
//
//   });
// });

app.listen(3000, function() {
  console.log("Server running for bowl of flicks boiiii");
});
