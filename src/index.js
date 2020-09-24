function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];
  return `$(today),${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherInfo(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    response.data.weather[0].weather - description
  );
}

//forecast
function displayForecast(response) {
  let forecastWeather = document.querySelector("#forecast");

  forecastWeather.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastWeather.innerHTML += `<div class="col-2">
    <h3>${formatHours(forecast.dt * 1000)}</h3><img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
       <div class="three-hour-forecast">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

/*function cityName(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-box-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchValue.value}`;
  searchCity(searchValue.value);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", cityName);

function showCurrentTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.getElementById("calc-temp");
  let location = document.getElementById("location");
  temperature.innerHTML = temp;
  location.innerHTML = response.data.name;
}*/

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-box-input");

  let apiKey = "5e39f9d1a00339cac657e6d5e124e87d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5e39f9d1a00339cac657e6d5e124e87d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherInfo);
}
navigator.geolocation.getCurrentPosition(currentLocation);
/*
function findCurrentLocation(event) {
  event.preventDefault();
  let location = document.getElementById("location");
  location.innerHTMl = "Location";
  navigator.geolocation.getCurrentPosition(currentLocation, error);
}

function error() {
  let location = document.getElementById("location");
  location.innerHTML = "Unable to retreive your location";
}

let currentButton = document.getElementById("search-current-temp");
currentButton.addEventListener("click", findCurrentLocation);
*/
function tempFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function tempCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let current = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formatDate(current);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener(click, tempFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener(click, tempCelsius);

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener(submit, searchCity);
