"use strict";

var weather = {
  // Property that holds the API key for OpenWeatherMap
  apiKey: "c235b39beb859eeb30e3774b3a867a45",
  // Method that makes a fetch request to the OpenWeatherMap API to get weather data for a specific city
  fetchWeather: function fetchWeather(city) {
    var _this = this;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then(function (response) {
      // Check if the response was successful
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      } // If successful, parse the response as JSON


      return response.json();
    }).then(function (data) {
      return _this.displayWeather(data);
    });
  },
  // Method that takes the weather data and displays it on the page
  displayWeather: function displayWeather(data) {
    // Destructure the data to get the values we need
    var name = data.name;
    var _data$weather$ = data.weather[0],
        icon = _data$weather$.icon,
        description = _data$weather$.description;
    var _data$main = data.main,
        temp = _data$main.temp,
        humidity = _data$main.humidity;
    var speed = data.wind.speed; // Log the data to the console

    console.log(name, icon, description, temp, humidity, speed); // Update the HTML elements on the page with the weather data

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https:openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/hr";
    document.querySelector("weather").classList.remove("loading");
  },
  // Method that get the city from the search bar and call fetchWeather method
  search: function search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
}; // Add a click event listener to the search button that calls the search method

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
}); // Add a keyup event listener to the search bar that calls the search method when the enter key is pressed

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
}); // Fetch the weather for Minneapolis by default

weather.fetchWeather("Minneapolis");
//# sourceMappingURL=script.dev.js.map
