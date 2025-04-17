let currentCity = document.querySelector("#currentCity");
let currentConditions = document.querySelector("#currentConditions");
let currentTemp = document.querySelector("#currentTemp");
let currentHumidity = document.querySelector("#currentHumidity");
let currentIcon = document.querySelector("#currentIcon");

let now = new Date();
let currentDate = document.querySelector("#currentDate");
let currentTime = document.querySelector("#currentTime");

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

currentDate.textContent = now.toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});
currentTime.textContent = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

function fetchWeather(cityName) {
  let apiKey = "06c63cbc3e714d4fd60883of7efa4t87";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`;
  console.log("Fetching weather for:", cityName);

  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
    currentCity.textContent = `🌎 ${response.data.city} 🌍`;
    currentConditions.textContent = `${toTitleCase(
      response.data.condition.description
    )}`;
    currentTemp.textContent = `${Math.round(
      response.data.temperature.current
    )}°C`;
    currentFeelsLike.textContent = `Feels Like ${Math.round(
      response.data.temperature.feels_like
    )}°C`;
    currentHumidity.textContent = `${response.data.temperature.humidity}% Humidity`;
    currentWind.textContent = `${Math.round(
      response.data.wind.speed
    )} km/h Wind`;
    currentPressure.textContent = `${response.data.temperature.pressure} mbar`;
    currentIcon.src = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
    currentIcon.alt = response.data.condition.description;
  });

  axios.get(forecastApiUrl).then(function (forecastResponse) {
    for (let i = 0; i < 5; i++) {
      let forecastDay = forecastResponse.data.daily[i];
      let date = new Date(forecastDay.time * 1000);
      let weekday = date.toLocaleDateString(undefined, {
        weekday: "long",
      });

      let dayElement = document.querySelector(`#day${i}`);
      let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png`;

      dayElement.innerHTML = `
  ${weekday}<br /><br /><strong>${Math.round(
        forecastDay.temperature.minimum
      )}°C</strong> → <strong>${Math.round(
        forecastDay.temperature.maximum
      )}°C</strong> <br /> ${toTitleCase(forecastDay.condition.description)}
  <img src="${iconUrl}" alt="${
        forecastDay.condition.description
      }" style="width: 50px; height: 50px;" /><br />
`;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let searchForm = document.getElementById("search-form");

  // 👉 Search form submission
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let cityName = document.getElementById("city").value;
    alert("Searching for weather in " + cityName + "...");
    fetchWeather(cityName);
  });

  // 👉 Prompt on initial page load
  let initialCity = prompt(
    "Enter a city to see its weather forecast:",
    "Tokyo"
  );
  if (!initialCity) {
    initialCity = "Tokyo";
  }

  // 👉 Pre-fill search input with the initial city
  document.getElementById("city").value = initialCity;

  // 👉 Fetch weather for initial city
  fetchWeather(initialCity);
});
