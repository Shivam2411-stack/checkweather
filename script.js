const card = document.querySelector('#card');
const currentHour = new Date().getHours();

// Set theme based on time
if (currentHour >= 18 || currentHour < 6) {
    card.style.background = `
    linear-gradient(146deg, rgba(25,25,112,0.8) 0%, rgba(72,61,139,0.85) 50%, rgba(0,0,51,0.9) 100%),
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 20%),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 20%)
    `;
    card.style.border = '0.3px solid violet';
}

const apikey = '2a19cbcd1b105f6ee37111528b3e0794';
const apiurl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const userser = document.querySelector('#search-city');
const srcbtn = document.querySelector('#srcbtn');
const weticon = document.querySelector('#weather-icon');
const type = document.querySelector('#type');

// Check weather and validate city
async function checkWeather(city) {
    // Apply animation to search section
    const searchSection = document.getElementById("searchSection");
    searchSection.classList.add("animate-search");

    setTimeout(() => {
        searchSection.classList.remove("animate-search");
    }, 400);

    try {
        // Fetch weather data
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found. Enter a valid CITY name.");
        }

        const data = await response.json();

        document.querySelector('#city').innerHTML = data.name + " (" + data.sys.country + ")";
        document.querySelector('#temp').innerHTML = data.main.temp + "&deg;c";
        document.querySelector('#humi').innerHTML = data.main.humidity + "%";
        document.querySelector('#Speed').innerHTML = data.wind.speed + " km/h";

        const currentHour = new Date().getHours();
        if (data.weather[0].main == "Clear") {
            weticon.src = currentHour >= 18 || currentHour < 6 ? "moon.png" : "clear.png";
            type.innerHTML = "Clear weather";
        } else if (data.weather[0].main == "Thunderstorm") {
            weticon.src = "thunder.png";
            type.innerHTML = "Thunderstorm";
        } else if (data.weather[0].main == "Rain") {
            weticon.src = "rain.png";
            type.innerHTML = "Heavy Rain";
        } else if (data.weather[0].main == "Drizzle") {
            weticon.src = "drizzle.png";
            type.innerHTML = "Light rain";
        } else if (data.weather[0].main == "Clouds") {
            weticon.src = "cloudy.png";
            type.innerHTML = "Cloudy";
        } else if (data.weather[0].main == "Haze" || data.weather[0].main == "Mist") {
            weticon.src = "mist.png";
            type.innerHTML = "Haze/Fog";
        }

        type.style.color = "white";
        type.style.fontWeight = "400";
    } catch (error) {
        alert(error.message);
    }
}

// Event listeners for search button and Enter key
srcbtn.addEventListener("click", () => {
    checkWeather(userser.value);
});
userser.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(userser.value);
    }
});
