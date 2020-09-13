let currentDate = new Date();
let dateTime = document.querySelector("#display-date");
let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let month = months[currentDate.getMonth()];

dateTime.innerHTML = `${day},${date}${month} ${hours}:${minutes}`;

function cityName(event) {
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
}

function searchCity(city) {
  let apiKey = "5e39f9d1a00339cac657e6d5e124e87d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5e39f9d1a00339cac657e6d5e124e87d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

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
