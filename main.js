function searchCity() {
    const city = document.getElementById("search-input").value;

    const apiKey = "89ad8ff1eb1720de8864d021b2f7d833";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" 
                + city + 
                "&units=metric&appid=" + apiKey;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // show weather box
            const box = document.querySelector(".return");
            if (box) box.style.display = "block";

            // 🌆 City + Temp
            document.querySelector(".city-name").innerText = data.name;
            document.querySelector(".weather-temp").innerText = data.main.temp + "°C";

            // 🌤 Weather condition
            document.querySelector(".weather-main").innerText = data.weather[0].main;

            // 💨 Wind
            document.querySelector(".wind").innerText = data.wind.speed + " m/s";

            // 💧 Humidity
            document.querySelector(".humidity").innerText = data.main.humidity + "%";

            // 🌡 Pressure
            document.querySelector(".pressure").innerText = data.main.pressure + " hPa";

            // 🌅 Sunrise
            const sunrise = new Date(data.sys.sunrise * 1000);
            document.querySelector(".sunrise").innerText = sunrise.toLocaleTimeString();

            // 🌇 Sunset
            const sunset = new Date(data.sys.sunset * 1000);
            document.querySelector(".sunset").innerText = sunset.toLocaleTimeString();

        })
        .catch(error => {
            alert("City not found ❌");
            console.log(error);
        });
}
