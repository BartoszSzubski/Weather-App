const input = document.querySelector(".input");
const searchButton = document.querySelector(".search");
const cityName = document.querySelector(".city-name");
const photo = document.querySelector(".temperature-photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");
const windy = document.querySelector(".wind");
const warning = document.querySelector(".warning");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=54a31b2a591bd3027d9197bdeff75df4";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value || "warszawa";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const wind = res.data.wind.speed;
      const status = Object.assign({}, ...res.data.weather);

      weather.textContent = status.main;
      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";
      windy.textContent = Math.floor(wind) + " km/h";
      console.log(res.data.wind);

      warning.textContent = "";
      input.value = "";

      if (status.id >= 200 && status.id < 300) {
        photo.setAttribute("src", "./images/thunderstorm.png");
      } else if (status.id >= 300 && status.id < 400) {
        photo.setAttribute("src", "./images/drizzle.png");
      } else if (status.id >= 500 && status.id < 600) {
        photo.setAttribute("src", "./images/rain.png");
      } else if (status.id >= 600 && status.id < 700) {
        photo.setAttribute("src", "./images/ice.png");
      } else if (status.id >= 700 && status.id < 800) {
        photo.setAttribute("src", "./images/fog.png");
      } else if (status.id === 800) {
        photo.setAttribute("src", "./images/sun.png");
      } else if (status.id >= 800 && status.id < 900) {
        photo.setAttribute("src", "./images/cloud.png");
      } else {
        photo.setAttribute("src", "./images/uknown.png");
      }
    })
    .catch(
      () =>
        (warning.textContent =
          "City not found. Please enter a valid city name.")
    );
};

const enterPush = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};

input.addEventListener("keyup", enterPush);
searchButton.addEventListener("click", getWeather);
getWeather();
