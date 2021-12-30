//date-time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let current = document.querySelector("h2");
current.innerHTML = `${day} ${hour}:${minute}`;

//Seaching City & Temperature

function showTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let temperatureConvert = document.querySelector("#fahrenheitConvert");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  temperatureConvert.innerHTML = Math.round(response.data.main.temp * 1.8 + 32);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input-text").value;
  search(city);
}
function search(city) {
  let apiKey = "60462b3bc0c4ae404c2c0d6dfb41aa2b";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Add Forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="weather-forecast-date">${day}</div>
  <img 
  src="http://openweatherapp.org/img/wn/50d@2x.png"
  alt=""
  width="42"
  />
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max">
     20° : 
    </span>
        <span class="weather-forecase-temperature-min">
         10°
        </span>
  </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "60462b3bc0c4ae404c2c0d6dfb41aa2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
displayForecast();
