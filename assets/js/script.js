// global variables
var searchHistoryEl = $("#search-history");

// get search history from localStorage and display on page
var searchHistory = JSON.parse(localStorage.getItem("search"));
if (!searchHistory) {
    searchHistory = []
}
else {
    for (let i = 0; i < searchHistory.length; i++) {
        var cityListItemEl = $("<li></li>");
        cityListItemEl.addClass("list-group-item");
        cityListItemEl.text(searchHistory[i]);
        $(searchHistoryEl).append(cityListItemEl);
    }
}

// search
var fetchWeather = function (searchTerm) {
    var cityName = searchTerm;
    fetch("https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" 
    + cityName + "&appid=61c9307a53a9d97b2af0939528ef8c0b")
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response)
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        console.log(lat)
        console.log(lon)
        return fetch(
            "https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely,hourly,alerts&lat="
            + lat + "&lon=" + lon + "&appid=61c9307a53a9d97b2af0939528ef8c0b")
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        $("#city").text(cityName);
        var cityListItemEl = $("<li class='list-group-item'></li>");
        cityListItemEl.text(cityName);
        $(searchHistoryEl).append(cityListItemEl);
        searchHistory.push(cityName);
        localStorage.setItem("search", JSON.stringify(searchHistory));

        $("#today-in").removeClass("d-none");
        $("#5-day-fcast").removeClass("d-none");

        console.log(response)
        /* current weather */
        console.log(cityName);
        console.log(response.current.weather[0].main, response.current.weather[0].description);
        console.log("Current temp: " + response.current.temp);
        console.log("Humidity: " + response.current.humidity);
        console.log("UVI: " + response.current.uvi);
        console.log("Wind speed: " + response.current.wind_speed + " " + response.current.wind_deg);
        console.log("Sunrise time: " + response.current.sunrise);
        console.log("Sunset time: " + response.current.sunset);

        $("#today-description").text(
            response.current.weather[0].main 
            + ", " 
            + response.current.weather[0].description);
        $("#temp").text(response.current.temp);
        $("#humidity").text("Humidity: " + response.current.humidity);
        $("#uv").text("UVI: " + response.current.uvi);
        $("#wind").text("Wind speed: " + response.current.wind_speed + " " + response.current.wind_deg);
        $("#sunrise").text("Sunrise time: " + response.current.sunrise);
        $("#sunset").text("Sunset time: " + response.current.sunset)
        
        

        /* 5-day forecast */
        /* day 1 */
        console.log("Day 1");
        console.log("Temp: " + response.daily[1].temp.day);
        console.log("Humidity: " + response.daily[1].humidity);
        console.log(response.daily[1].weather[0].main, response.daily[1].weather[0].description);

        $("#day1-description").text(
            response.daily[1].weather[0].main 
            + ", " + response.daily[1].weather[0].description);
        $("#day1-temp").text(response.daily[1].temp.day);
        $("#day1-humidity").text("Humidity: " + response.daily[1].humidity);

        /* day 2 */
        console.log("Day 2");
        console.log("Temp: " + response.daily[2].temp.day);
        console.log("Humidity: " + response.daily[2].humidity);
        console.log(response.daily[2].weather[0].main, response.daily[2].weather[0].description);

        $("#day2-description").text(
            response.daily[2].weather[0].main
            + ", " + response.daily[2].weather[0].description);
        $("#day2-temp").text(response.daily[2].temp.day);
        $("#day2-humidity").text("Humidity: " + response.daily[2].humidity);

        /* day 3 */
        console.log("Day 3");
        console.log("Temp: " + response.daily[3].temp.day);
        console.log("Humidity: " + response.daily[3].humidity);
        console.log(response.daily[3].weather[0].main, response.daily[3].weather[0].description);

        $("#day3-description").text(
            response.daily[3].weather[0].main
            + ", " + response.daily[3].weather[0].description);
        $("#day3-temp").text(response.daily[3].temp.day);
        $("#day3-humidity").text("Humidity: " + response.daily[3].humidity);

        /* day 4 */
        console.log("Day 4");
        console.log("Temp: " + response.daily[4].temp.day);
        console.log("Humidity: " + response.daily[4].humidity);
        console.log(response.daily[4].weather[0].main, response.daily[4].weather[0].description);

        $("#day4-description").text(
            response.daily[4].weather[0].main
            + ", " + response.daily[4].weather[0].description);
        $("#day4-temp").text(response.daily[4].temp.day);
        $("#day4-humidity").text("Humidity: " + response.daily[4].humidity);

        /* day 5 */
        console.log("Day 5");
        console.log("Temp: " + response.daily[5].temp.day);
        console.log("Humidity: " + response.daily[5].humidity);
        console.log(response.daily[5].weather[0].main, response.daily[5].weather[0].description);

        $("#day5-description").text(
            response.daily[5].weather[0].main
            + ", " + response.daily[5].weather[0].description);
        $("#day5-temp").text(response.daily[5].temp.day);
        $("#day5-humidity").text("Humidity: " + response.daily[5].humidity);


    })
};

// event listeners for search bar and search history list 
$("#search").on("click", function() {
    fetchWeather($("#city-name").val());
});
$("#search-history").on("click", "li", function () {
   fetchWeather($(this).text());
})