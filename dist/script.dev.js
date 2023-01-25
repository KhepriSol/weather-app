"use strict";

var weather = {
  apiKey: "c235b39beb859eeb30e3774b3a867a45",
  fetchWeather: function fetchWeather(city) {
    var _this = this;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey).then(function (response) {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }

      return response.json();
    }).then(function (data) {
      return _this.displayWeather(data);
    });
  },
  displayWeather: function displayWeather(data) {
    var name = data.name;
    var _data$weather$ = data.weather[0],
        icon = _data$weather$.icon,
        description = _data$weather$.description;
    var _data$main = data.main,
        temp = _data$main.temp,
        humidity = _data$main.humidity;
    var speed = data.wind.speed;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in" + name;
    document.querySelector(".icon").src = "https:openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/hr";
    document.querySelector("weather").classList.remove("loading");
  },
  search: function search() {
    this.fetchWeather(document.querySelector(".search-bar").value);
  }
};
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});
weather.fetchWeather("Minneapolis");
//# sourceMappingURL=script.dev.js.map
