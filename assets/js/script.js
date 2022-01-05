var apiKey = "881f77ea"
var imdbApiKey = "k_ycgtzpsn"
// var tasteApiKey = "430108-MovieWat-3L4Y98MZ"
// var movieSearch = "Iron Man"
var movieSearch = document.getElementById("movieSearch");
var searchBtn = document.getElementById("searchBtn")


// var posterUrl = "https://imdb-api.com/en/API/SearchMovie/" + imdbApiKey + "/" + movie;

// var tasteUrl = "https://tastedive.com/api/similar?q=" + movie + "&k=" + tasteApiKey;

var movieTitle = "";
var plot = "";
var genre = "";
var mpaaRating = "";
var runtime = "";
var releaseDate = "";
var director = "";
var actors = "";
var imdbRating = "";
var rtRating = "";
var mcRating = "";
var posterUrl = "";
var imdbId = "";
var trailerUrl = "";

searchBtn.addEventListener("click", searchBtnClick);
function searchBtnClick(event) {
    let movie = movieSearch.value;
    console.log(movie);
    movieInfo(movie);
}

function movieInfo(movie) {
    var omdbUrl = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie;
    fetch(omdbUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            movieTitle = data.Title;
            plot = data.Plot;
            genre = data.Genre;
            mpaaRating = data.Rated;
            runtime = data.Runtime;
            releaseDate = data.Released;
            director = data.Director;
            actors = data.Actors;
            imdbRating = data.Ratings[0].Value;
            rtRating = data.Ratings[1].Value;
            mcRating = data.Ratings[2].Value;
            posterUrl = data.Poster;

            console.log(plot);
            console.log(genre);
            console.log(mpaaRating);
            console.log(runtime);
            console.log(releaseDate);
            console.log(director);
            console.log(actors);
            console.log(imdbRating);
            console.log(rtRating);
            console.log(mcRating);
            console.log(posterUrl);

            $("#moviePoster").attr("src", posterUrl);
            $("#movieTitle").text(movieTitle);
            $("#plot").text(plot);
            $("#genre").text("Genre: " + genre);
            $("#mpaaRating").text("Rated: " + mpaaRating);
            $("#runtime").text("Runtime: " + runtime);
            $("#releaseDate").text("Release Date: " + releaseDate);
            $("#director").text("Directed by: " + director);
            $("#actors").text("Actors: " + actors);
            $("#movieRatings").text("Movie Ratings");
            $("#imdbRating").text("IMDb: " + imdbRating);
            $("#rtRating").text("Rotten Tomatoes: " + rtRating);
            $("#mcRating").text("Metacritic: " + mcRating);


            imdbId = data.imdbID;
            var imdbUrl = "https://imdb-api.com/API/YouTubeTrailer/" + imdbApiKey + "/" + imdbId;
            fetch(imdbUrl)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var trailerUrl = data.videoUrl;
                    console.log(trailerUrl);
                })
        })
}



// fetch(tasteUrl)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })

// fetch(posterUrl)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     }) // for posters

// fetch(imdbUrl)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })



// fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=Jaws&country=us", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "e3c6f9ffc5msh37b059e126c3216p1b907bjsnbce8a4f62537"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

// fetch("https://gowatch.p.rapidapi.com/lookup/title/tmdb_id?id=496243&type=movie&country=us", {
// 	"method": "POST",
// 	"headers": {
// 		"content-type": "application/x-www-form-urlencoded",
// 		"x-rapidapi-host": "gowatch.p.rapidapi.com",
// 		"x-rapidapi-key": "e3c6f9ffc5msh37b059e126c3216p1b907bjsnbce8a4f62537"
// 	},
// 	"body": {
// 		"id": "496243",
// 		"type": "movie",
// 		"country": "us"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });