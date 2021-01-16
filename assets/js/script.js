// search
$("#search").on("click", function () {
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

        /* day 2 */
        console.log("Day 2");
        console.log("Temp: " + response.daily[2].temp.day);
        console.log("Humidity: " + response.daily[2].humidity);
        console.log(response.daily[2].weather[0].main, response.daily[2].weather[0].description);

        /* day 3 */
        console.log("Day 3");
        console.log("Temp: " + response.daily[3].temp.day);
        console.log("Humidity: " + response.daily[3].humidity);
        console.log(response.daily[3].weather[0].main, response.daily[3].weather[0].description);

        /* day 4 */
        console.log("Day 4");
        console.log("Temp: " + response.daily[4].temp.day);
        console.log("Humidity: " + response.daily[4].humidity);
        console.log(response.daily[4].weather[0].main, response.daily[4].weather[0].description);

        /* day 5 */
        console.log("Day 5");
        console.log("Temp: " + response.daily[5].temp.day);
        console.log("Humidity: " + response.daily[5].humidity);
        console.log(response.daily[5].weather[0].main, response.daily[5].weather[0].description);


    })
})