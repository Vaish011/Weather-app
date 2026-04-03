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
    alert("URL is: " + url);
    /*fetch(url)
        .then(res => res.json())
        .then(data => updateUI(data))
        .catch(() => alert("Fetch failed!"))*/

    fetch(url)
        .then(res => {
        alert("Status: " + res.status);
        return res.json();
    })
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
    
    const cityName = document.getElementById("city-name");
    if (cityName) cityName.innerText = data.name;
    
    const weatherMain = document.getElementById("weather-main");
    if (weatherMain) weatherMain.innerText = data.weather[0].main;
    
    const humidity = document.getElementById("humidity");
    if (humidity) humidity.innerText = data.main.humidity + "%";
    
    const feelsLike = document.getElementById("feels-like");
    if (feelsLike) feelsLike.innerText = data.main.feels_like;
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

// 🔹 GPS on homepage load
window.onload = function () {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
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
