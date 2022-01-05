var apiKey = "881f77ea"
var imdbApiKey = "k_ycgtzpsn"
// Eric - my imdb api key: k_wr2r650t 
// Eric - OMDB- key: eff6676c
// var tasteApiKey = "430108-MovieWat-3L4Y98MZ"

var movieSearch = document.getElementById("movieSearch");
var searchBtn = document.getElementById("searchBtn")

var storedMovieKeys = Object.keys(localStorage);
var favMovieList = []
$(document).on('click','#saveBtn', function(e) {
    var movieTitle= $(e.target).parent().children(".title").text();
    
    for (i = 0; i < favMovieList.length; i++) {
        if (movieTitle === favMovieList[i]) {
            favMovieList.splice(i, 1);
        }
    }
    favMovieList.push(movieTitle)
    localStorage.setItem('watchList',favMovieList);
    console.log(favMovieList);
});

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
};

function addSaveBtn(){
    if ($("#saveBtn")){
        $("#saveBtn").remove();
    }
    var newBtn =$('<input type="button" value="Add to Watch List"/>').attr({
        type: "button",
        id:"saveBtn",
        class: "is-success",        
    })
    $('#movieContent').append(newBtn)
};

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

            addSaveBtn()

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
            // fetch(imdbUrl)
            //     .then(function (response) {
            //         console.log(response);
            //         return response.json();
            //     })
            //     .then(function (data) {
            //         console.log(data);
            //         var trailerUrl = data.videoUrl;
            //         console.log(trailerUrl);
            //         $("#trailerUrl").attr("href", trailerUrl);
            //         $("#trailerUrl").text("Click to watch trailer")
            //     })
        })
}
