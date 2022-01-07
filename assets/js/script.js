var apiKey = "881f77ea"
var imdbApiKey = "k_ycgtzpsn"
// Eric - my imdb api key: k_wr2r650t 
// Eric - OMDB- key: eff6676c
// Keith - OMDB - key: ac1f15b6

var movieSearch = document.getElementById("movieSearch");
var searchBtn = document.getElementById("searchBtn")

var storedMovieKeys = Object.keys(localStorage);
var watchList = localStorage.watchList ? JSON.parse(localStorage.watchList): []
$(document).on('click','#saveBtn', function(e) {
    let movieTitle= $(e.target).parent().children(".title").text();
    
    for (i = 0; i < watchList.length; i++) {
        if (movieTitle === watchList[i]) {
            watchList.splice(i, 1);
        }
    }
    watchList.push(movieTitle)
    localStorage.watchList = JSON.stringify(watchList);
    console.log(watchList);
    createWatchList()
});
$(document).on('click','#removeBtn', function(e) {
    let movieTitle= $(e.target).parent().children(".title").text();
    
    for (i = 0; i < watchList.length; i++) {
        if (movieTitle === watchList[i]) {
            watchList.splice(i, 1);
        }
    }
    createWatchList()
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

createWatchList()

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
    var newBtn =$('<input value="Add to Watch List"/>').attr({
        type: "submit",
        id:"saveBtn",
        class: "button is-link",        
    })
    $('#movieContent').append(newBtn)
};

function addRemoveBtn(){
    if ($("#removeBtn")){
        $("#removeBtn").remove();
    }
    var newBtn =$('<input value="Remove from Watch List"/>').attr({
        type: "submit",
        id:"removeBtn",
        class: "button is-link is-danger is-outlined",        
    })
    $('#movieContent').append(newBtn)
}

function createWatchList() {
    document.querySelector("#watchList").innerHTML = "";
    for (i = 0; i < watchList.length; i++) {
        document.querySelector("#watchList").innerHTML += `<button onclick='watchMovieInfo(event)' id = "${watchList[i]}" class="button column is-half is-success is-outlined style-btn">${watchList[i]}</button>`
    }
}
function movieInfo(movie) {
    var omdbUrl = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie;
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
            addRemoveBtn()

            $("#moviePoster").attr("src", posterUrl);
            $("#movieTitle").text(movieTitle);
            $("#plot").text(plot);
            $("#genre").text("Genre: " + genre);
            $("#mpaaRating").text("Rated: " + mpaaRating);
            $("#runtime").text("Runtime: " + runtime);
            $("#releaseDate").text("Release Date: " + releaseDate);
            $("#director").text("Directed by: " + director);
            $("#actors").text("Actors: " + actors);
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
                    $("#trailerUrl").attr("href", trailerUrl);
                    $("#trailerUrl").text("Click to watch trailer")
                }) // comment out when testing to preserve limited calls per day
        })
}

function watchMovieInfo(event) {
    console.log(event.target.id);
    movieInfo(event.target.id);
}
