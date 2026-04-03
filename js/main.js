//alert("JS connected");

//function searchCity() {
    //alert("clicked");
//}


/*function searchCity() {
    const city = document.getElementById("search-input").value.trim();

    if (!city) {
        alert("Enter city name");
        return;
    }

    const apiKey = "89ad8ff1eb1720de8864d021b2f7d833";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" 
                + city + 
                "&units=metric&appid=" + apiKey;

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            document.querySelector(".return").style.display = "block";

            document.querySelector(".city-name").innerText = data.name;
            document.querySelector(".weather-temp").innerText = data.main.temp + "°C";
            document.querySelector(".weather-main").innerText = data.weather[0].main;

            document.querySelector(".wind").innerText = data.wind.speed + " m/s";
            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".pressure").innerText = data.main.pressure + " hPa";

            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);

            document.querySelector(".sunrise").innerText = sunrise.toLocaleTimeString();
            document.querySelector(".sunset").innerText = sunset.toLocaleTimeString();
        })
        .catch(() => {
            alert("Error fetching data");
        });
}*/



const apiKey = "89ad8ff1eb1720de8864d021b2f7d833";

// 🔹 get weather using coordinates
function getWeatherByCoords(lat, lon) {
    alert("GPS got: " + lat + ", " + lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => updateUIHome(data))
        .catch((err) => alert("Fetch failed: " + err.message));
}

// 🔹 get weather using city (for search page)
function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(res => res.json())
        .then(data => updateUI(data))
        .catch(() => alert("City not found"));
}

// 🔹 update UI 

    function updateUIHome(data) {
    if (data.cod !== 200) return;
    
    // City name
    const cityName = document.getElementById("city-name");
    if (cityName) cityName.innerText = data.name;
    
    // Weather description
    const weatherMain = document.getElementById("weather-main");
    if (weatherMain) weatherMain.innerText = data.weather[0].main;
    
    // Humidity and feels like
    const humidity = document.getElementById("humidity");
    if (humidity) humidity.innerText = data.main.humidity;
    
    const feelsLike = document.getElementById("feels-like");
    if (feelsLike) feelsLike.innerText = Math.round(data.main.feels_like);
    
    // Today section
    const tempMin = document.getElementById("temp-min-today");
    if (tempMin) tempMin.innerText = Math.round(data.main.temp_min) + "°";
    
    const tempMax = document.getElementById("temp-max-today");
    if (tempMax) tempMax.innerText = Math.round(data.main.temp_max) + "°";
    
    const weatherToday = document.querySelector(".weather-main-today");
    if (weatherToday) weatherToday.innerText = data.weather[0].main;
    }






function updateUI(data) {
    if (data.cod !== 200) return;
    console.log(data.name);

    document.querySelector(".city-name").innerText = data.name;
    document.querySelector(".weather-temp").innerText = data.main.temp + "°C";
    document.querySelector(".weather-main").innerText = data.weather[0].main;

    document.querySelector(".wind").innerText = data.wind.speed + " m/s";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";

    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    document.querySelector(".sunrise").innerText = sunrise.toLocaleTimeString();
    document.querySelector(".sunset").innerText = sunset.toLocaleTimeString();
}

// 🔹 search button function 
function searchCity() {
    const city = document.getElementById("search-input").value.trim();
    if (city) {
        getWeather(city);
    }
}


function getForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const box = document.getElementById("future-forecast-box");
            box.innerHTML = "";
            
            // Get one forecast per day (every 8th item = 24 hours)
            const daily = data.list.filter((item, index) => index % 8 === 0);
            
            daily.forEach(day => {
                const date = new Date(day.dt * 1000);
                const dayName = date.toLocaleDateString("en-US", {weekday: "short"});
                const temp = Math.round(day.main.temp) + "°";
                const desc = day.weather[0].main;
                
                box.innerHTML += `
                    <div class="forecast-day">
                        <p>${dayName}</p>
                        <p>${temp}</p>
                        <p>${desc}</p>
                    </div>
                `;
            });
        })
        .catch(() => console.log("Forecast error"));
}
// 🔹 GPS on homepage load
window.onload = function () {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
                getForecast(lat, lon);
            },
            () => {
                // fallback if user denies location
                getWeather("Delhi");
            }
        );

    } else {
        getWeather("Delhi");
    }
};
