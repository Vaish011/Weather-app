function searchCity() {
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
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            if (data.cod !== 200) {
                alert("City not found");
                return;
            }

            const box = document.querySelector(".return");
            if (box) {
                box.style.display = "block";
            }

            document.querySelector(".city-name").innerText = data.name;
            document.querySelector(".weather-temp").innerText = data.main.temp + "°C";

            const weatherMain = document.querySelector(".weather-main");
            if (weatherMain) {
                weatherMain.innerText = data.weather[0].main;
            }

            const wind = document.querySelector(".wind");
            if (wind) {
                wind.innerText = data.wind.speed + " m/s";
            }

            const humidity = document.querySelector(".humidity");
            if (humidity) {
                humidity.innerText = data.main.humidity + "%";
            }

            const pressure = document.querySelector(".pressure");
            if (pressure) {
                pressure.innerText = data.main.pressure + " hPa";
            }

            const sunrise = document.querySelector(".sunrise");
            if (sunrise) {
                const sr = new Date(data.sys.sunrise * 1000);
                sunrise.innerText = sr.toLocaleTimeString();
            }

            const sunset = document.querySelector(".sunset");
            if (sunset) {
                const ss = new Date(data.sys.sunset * 1000);
                sunset.innerText = ss.toLocaleTimeString();
            }
        })
        .catch(function(error) {
            alert("Error fetching data");
            console.log(error);
        });
}
