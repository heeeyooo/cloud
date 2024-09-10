const API_KEY = "524fc2453b5dfb071ec3b8986ce771e0";
const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

form.onsubmit = submitHandler;

// SUBMIT
async function submitHandler(e) {
  // CANCEL THE RELOAD
  e.preventDefault();
  const cityInfo = await getGeo(input.value.trim());

  try {
    if (!input.value.trim()) throw "Enter city name";
    if (!cityInfo.length) throw "Enter correct city name";
  } catch (err) {
    alert(err);
    input.value = "";
  }

  const weatherInfo = await getWeather(cityInfo[0]["lat"], cityInfo[0]["lon"]);

  const weatherData = {
    temp: weatherInfo.main.temp,
    name: weatherInfo.name,
    type: weatherInfo.weather[0]["main"],
    humidity: weatherInfo.main.humidity,
    speed: weatherInfo.wind.speed,
  };

  renderWeatherData(weatherData);

  // EMPTY INPUT
  input.value = "";
  //   BLUR INPUT
  input.blur();
}

// GET GEOLOCATION LAT AND LON
async function getGeo(name) {
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`;
  const response = await fetch(geoUrl);
  const data = await response.json();
  return data;
}

// GET WEATHER
async function getWeather(lat, lon) {
  // UNITS=METRIC FOR CELCIUM
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return data;
}

// RENDER WEATHER DATA
function renderWeatherData(data) {
  document.querySelector(".weather-container").classList.remove("none");
  const temp = document.querySelector(".weather__temp");
  const city = document.querySelector(".weather__city");
  const type = document.querySelector(".weather__type");
  const humidity = document.querySelector("#humidity");
  const speed = document.querySelector("#speed");
  const weatherImg = document.querySelector(".weather-img");
  temp.innerText = Math.round(data.temp) + "°c";
  city.innerText = data.name;
  type.innerText = data.type;
  humidity.innerText = data.humidity + "%";
  speed.innerText = data.speed + " km/h";
  weatherImg.src = `./img/weather/${data.type.toLowerCase()}.png`;
}

// DAY
const day = document.querySelector(".header__day");

switch (new Date().getDay()) {
  case 0:
    day.textContent = "Sunday, " + new Date().getDate();
    break;
  case 1:
    day.textContent = "Monday, " + new Date().getDate();
    break;
  case 2:
    day.textContent = "Tuesday, " + new Date().getDate();
    break;
  case 3:
    day.textContent = "Wednesday, " + new Date().getDate();
    break;
  case 4:
    day.textContent = "Thursday, " + new Date().getDate();
    break;
  case 5:
    day.textContent = "Friday, " + new Date().getDate();
    break;
  case 6:
    day.textContent = "Saturday, " + new Date().getDate();
}

// INTERACTIONS ON MOBILE
addEventListener("touchmove", () => {
  true;
});

// SUGGEST CITY
function recomendHandler(prop) {
  document.querySelector(".suggest").classList.add("none");
  input.value = prop;
}
