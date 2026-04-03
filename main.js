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

            // show result section (important if hidden)
            const box = document.querySelector(".return");
            if (box) box.style.display = "block";

            // update UI
            document.querySelector(".city-name").innerText = data.name;
            document.querySelector(".weather-temp").innerText = data.main.temp + "°C";
        })
        .catch(error => {
            alert("City not found ❌");
            console.log(error);
        });
}
