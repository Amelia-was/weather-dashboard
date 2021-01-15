// search
$("#search").on("click", function () {
    console.log("search!");
    var cityName = $("#city-name").val();
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
        console.log(response)
        /*console.log(response.city.name);
        console.log("Current temp: " + response.list[0].main.temp);
        console.log("Humidity: " + response.list[0].main.humidity);
        console.log(response.list[0].weather[0].main, response.list[0].weather[0].description);
        console.log("Wind speed: " + response.list[3].speed + response.list[3].deg);
        console.log("Sunrise time: " + response.city.sunrise);
        console.log("Sunset time: " + response.city.sunset);*/

    })
})