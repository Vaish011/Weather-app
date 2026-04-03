const apiKey = "89ad8ff1eb1720de8864d021b2f7d833";

// Random famous cities
const randomCities = [
    "London", "Tokyo", "Paris", "New York", "Dubai",
    "Sydney", "Mumbai", "Berlin", "Toronto", "Singapore"
];

function getWeatherForCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) return;
            addCityCard(data);
        })
        .catch(() => console.log("Error fetching: " + city));
}

function addCityCard(data) {
    const box = document.querySelector(".city-box");

    const icons = {
        "Clear": "sun.png",
        "Clouds": "cloud.png",
        "Rain": "rain.png",
        "Drizzle": "rain.png",
        "Snow": "snow.png",
        "Thunderstorm": "thunderstorm.png",
        "Mist": "mist.png",
        "Haze": "haze.png"
    };

    const icon = icons[data.weather[0].main] || "sun.png";

    const card = document.createElement("div");
    card.className = "city-card";
    card.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${icon}" alt="weather"/>
        <p class="temp">${Math.round(data.main.temp)}°C</p>
        <p class="desc">${data.weather[0].main}</p>
        <p class="details">H: ${data.main.humidity}% | F: ${Math.round(data.main.feels_like)}°</p>
    `;

    box.appendChild(card);
}

function searchCity() {
    const city = document.querySelector(".searchinput").value.trim();
    if (!city) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                document.querySelector(".error-message").style.display = "block";
                document.querySelector(".normal-message").style.display = "none";
                document.querySelector(".added-message").style.display = "none";
                return;
            }
            document.querySelector(".error-message").style.display = "none";
            document.querySelector(".normal-message").style.display = "none";
            document.querySelector(".added-message").style.display = "block";
            addCityCard(data);
        })
        .catch(() => console.log("Search error"));
}

// Search on Enter key
document.querySelector(".searchinput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") searchCity();
});


// Load random cities on start
window.onload = function() {
    randomCities.forEach(city => getWeatherForCity(city));
};


//date 
function updateDate() {
    const dateElement = document.getElementById("current-date");

    const today = new Date();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    dateElement.innerText = today.toLocaleDateString("en-US", options);
}

updateDate();

//toggle 

document.querySelector(".btn-icon").addEventListener("click", function() {
    const addSection = document.querySelector(".add-section");
    alert("Found: " + addSection);
});
