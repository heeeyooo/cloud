import "./headerData.js";
import dayjs from "https://unpkg.com/dayjs@1.11.13/esm/index.js";

// ALLOWS HOVER ON TOUCH DEVICES
addEventListener("touchstart", function () {}, true);

const API_KEY = "524fc2453b5dfb071ec3b8986ce771e0";
const form = document.querySelector("#form");
const input = document.querySelector(".form__input");

form.onsubmit = submitHandler;

// SUBMIT
async function submitHandler(e) {
    // CANCEL THE RELOAD
    e.preventDefault();

    // HIDE SUGGESTED
    document.querySelector(".suggest").classList.add("none");

    const cityInfo = await getGeo(input.value.trim());

    try {
        if (!input.value.trim()) throw "Enter city name";
        if (!cityInfo.length) throw "Enter correct city name";
    } catch (err) {
        alert(err);
        input.value = "";
    }

    const weatherInfo = await getWeather(
        cityInfo[0]["lat"],
        cityInfo[0]["lon"]
    );

    const weatherData = {
        temp: weatherInfo.list[0].main.temp,
        name: cityInfo[0].name,
        type: weatherInfo.list[0].weather[0].main,
        humidity: weatherInfo.list[0].main.humidity,
        speed: weatherInfo.list[0].wind.speed,
    };

    const today = dayjs();

    const firstDay = today;

    const secondDay = today.add(1, "days");

    const thirdDay = today.add(2, "days");

    const fourthDay = today.add(3, "days");

    const fifthDay = today.add(4, "days");

    function formatCustomDay(param) {
        return param.format("YYYY-M-D");
    }

    let firstDayHTML = "";
    weatherInfo.list
        .filter((item) => {
            return item.dt_txt.includes(formatCustomDay(firstDay));
        })
        .forEach((item, index) => {
            if (index === 0) {
                firstDayHTML += ` <p>Today</p>
                    <img src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <div>
                    <p>H:${Math.ceil(item.main.temp_max)}&deg;</p>
                    <p>L:${Math.floor(item.main.temp_min)}&deg;</p>
                    </div >
                        `;
            }
        });

    document.querySelector(".first-day-container").innerHTML = firstDayHTML;

    let secondDayHTML = "";
    weatherInfo.list
        .filter((item) => {
            return item.dt_txt.includes(formatCustomDay(secondDay));
        })
        .forEach((item, index) => {
            if (index === 0) {
                secondDayHTML += ` <p>${secondDay.format("dddd")}</p>
                    <img src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <div>
                   <p>H:${Math.ceil(item.main.temp_max)}&deg;</p>
                    <p>L:${Math.floor(item.main.temp_min)}&deg;</p>
                    </div >
                    `;
            }
        });

    document.querySelector(".second-day-container").innerHTML = secondDayHTML;

    let thirdDayHTML = "";
    weatherInfo.list
        .filter((item) => {
            return item.dt_txt.includes(formatCustomDay(thirdDay));
        })
        .forEach((item, index) => {
            if (index === 0) {
                thirdDayHTML += ` <p>${thirdDay.format("dddd")}</p>
                    <img src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <div>
                  <p>H:${Math.ceil(item.main.temp_max)}&deg;</p>
                    <p>L:${Math.floor(item.main.temp_min)}&deg;</p>
                    </div >
                    `;
            }
        });

    document.querySelector(".third-day-container").innerHTML = thirdDayHTML;

    let fourthDayHTML = "";
    weatherInfo.list
        .filter((item) => {
            return item.dt_txt.includes(formatCustomDay(fourthDay));
        })
        .forEach((item, index) => {
            if (index === 0) {
                fourthDayHTML += ` <p>${fourthDay.format("dddd")}</p>
                    <img src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <div>
                 <p>H:${Math.ceil(item.main.temp_max)}&deg;</p>
                    <p>L:${Math.floor(item.main.temp_min)}&deg;</p>
                    </div >
                    `;
            }
        });

    document.querySelector(".fourth-day-container").innerHTML = fourthDayHTML;

    let fifthDayHTML = "";
    weatherInfo.list
        .filter((item) => {
            return item.dt_txt.includes(formatCustomDay(fifthDay));
        })
        .forEach((item, index) => {
            if (index === 0) {
                fifthDayHTML += `<p>${fifthDay.format("dddd")}</p>
                    <img src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <div>
               <p>H:${Math.ceil(item.main.temp_max)}&deg;</p>
                    <p>L:${Math.floor(item.main.temp_min)}&deg;</p>
                    </div >
                    `;
            }
        });

    document.querySelector(".fifth-day-container").innerHTML = fifthDayHTML;

    let firstTimeHTML = "";
    weatherInfo.list.slice(0, 9).forEach((item) => {
        firstTimeHTML += `
                <div>
                    <p>${item.dt_txt.slice(11, 16)}</p>
                    <img width="20px" src="./img/weather/${item.weather[0].main.toLowerCase()}.png"/>
                    <p>${Math.round(item.main.temp)}&deg;</p>
                </div>
                    `;
    });

    document.querySelector(".weather-hourly-container").innerHTML =
        firstTimeHTML;

    renderWeatherData(weatherData);

    // EMPTY INPUT
    input.value = "";
    //   BLUR INPUT
    input.blur();

    document.querySelector(".weather-container").scrollTo(0, 0);
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
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`;
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

document.querySelectorAll(".suggest-form").forEach((suggestForm) => {
    suggestForm.addEventListener("click", () => {
        const suggestValue = suggestForm.value;
        recomendHandler(suggestValue);
    });
});

// SUGGEST CITY
function recomendHandler(prop) {
    document.querySelector(".suggest").classList.add("none");
    input.value = prop;
}
