let currentCity = document.querySelector("#currentCity");
let currentConditions = document.querySelector("#currentConditions");
let currentTemp = document.querySelector("#currentTemp");
let currentHumidity = document.querySelector("#currentHumidity");

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

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // stop page reload
      let cityName = document.getElementById("city").value;
      alert("Searching for weather in " + cityName + "...");
      let apiKey = "06c63cbc3e714d4fd60883of7efa4t87";
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
      let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}`;
      console.log(apiUrl);

      axios.get(apiUrl).then(function (response) {
        console.log(response.data);
        currentCity.textContent = `🌎 ${response.data.city} 🌍`;
        currentConditions.textContent = `🌤️ ${toTitleCase(
          response.data.condition.description
        )}`;
        currentTemp.textContent = `${Math.round(
          response.data.temperature.current
        )}°C`;
        currentHumidity.textContent = `${response.data.temperature.humidity}% Humidity`;
      });

      axios.get(forecastApiUrl).then(function (forecastResponse) {
        for (let i = 0; i < 5; i++) {
          let forecastDay = forecastResponse.data.daily[i];
          let dayElement = document.querySelector(`#day${i}`);
          let date = new Date(forecastDay.time * 1000);
          let weekday = date.toLocaleDateString(undefined, {
            weekday: "short",
          });
          function getWeatherEmoji(description) {
            let desc = description.toLowerCase();
            if (desc.includes("clear")) return "☀️";
            if (desc.includes("cloud")) return "☁️";
            if (desc.includes("rain")) return "🌧️";
            if (desc.includes("snow")) return "❄️";
            if (desc.includes("storm")) return "⛈️";
            return "🌡️";
          }
          dayElement.innerHTML = `
            ${weekday}:<br />
            🌡️ ${Math.round(forecastDay.temperature.maximum)}°C<br />
            ${getWeatherEmoji(forecastDay.condition.description)} ${toTitleCase(
            forecastDay.condition.description
          )}
          `;
        }
      });
    });
});
