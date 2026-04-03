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
async function searchCity() {
    const city = document.getElementById("search-input").value;

    const apiKey = "89ad8ff1eb1720de8864d021b2f7d833";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    document.querySelector(".city-name").innerText = data.name;
document.querySelector(".weather-temp").innerText = data.main.temp + "°C";
}
