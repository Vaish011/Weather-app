const icon = document.getElementById("weather-icon");

let weather = "Snow"; // try Rain, Snow, Clear

if (weather === "Clouds") {
  icon.src = "cloud.png";
} else if (weather === "Rain") {
  icon.src = "rain.png";
} else if (weather === "Snow") {
  icon.src = "snow.png";
} else {
  icon.src = "sun.png";
}
function searchCity() {
  const city = document.getElementById("search-input").value;
  console.log("City:", city);
}
