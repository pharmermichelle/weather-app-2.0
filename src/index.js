document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // stop page reload
      let cityName = document.getElementById("city").value;
      alert("You entered: " + cityName);
    });
});
