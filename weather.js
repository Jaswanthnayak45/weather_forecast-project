// Function to set background based on weather condition
function init(weatherData) {
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';

    const weatherCondition = weatherData.weather[0].main; // Get the main weather condition

    switch (weatherCondition) {
        case 'Clear':
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/15/f6/a3/15f6a3aac562ee0fadbbad3d4cdf47bc.jpg')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('https://wallpapers.com/images/hd/clouds-4k-fecuaqx21wbchecx.jpg')";
            break;
        case 'Rain':
        case 'Drizzle': // Drizzle often looks like light rain
            document.body.style.backgroundImage = "url('https://w0.peakpx.com/wallpaper/119/481/HD-wallpaper-rainy-day.jpg')";
            break;
        case 'Mist':
        case 'Haze':
        case 'Fog':
            document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2023/01/15/17/58/nature-7720825_640.jpg')";
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1726818265070-c08eb719d77c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bmRlcnN0b3JtfGVufDB8fDB8fHww')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQB01RMiDXv3Zta93bsM508cqbdzB79awW4A&s')";
            break;
        default:
            // Fallback to the initial background if no specific image is found for the condition
            document.body.style.backgroundImage = "url('weather.jpg')";
            break;
    }
}

// Weather fetching function
async function getWeather(city) {
    const API_KEY = "8ef6fbe412d262782fc25391fe6eccb8"; // Your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const res = await fetch(url);
        
        if (!res.ok) {
            if (res.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling.`);
            } else {
                throw new Error(`HTTP error! Status: ${res.status}. Please try again later.`);
            }
        }

        const data = await res.json();
        
        document.getElementById("weatherOutput").textContent = `City: ${data.name}, ${data.sys.country}`;
        document.getElementById("weatherOutput1").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("weatherOutput2").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("weatherOutput3").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        
        init(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById("weatherOutput").textContent = `Error: ${error.message}`;
        document.getElementById("weatherOutput1").textContent = '';
        document.getElementById("weatherOutput2").textContent = '';
        document.getElementById("weatherOutput3").textContent = '';
        document.body.style.backgroundImage = "url('weather.jpg')";
    }
}

// Event listener for the search button
document.getElementById('but').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    } else {
        document.getElementById("weatherOutput").textContent = 'Please enter a city name.';
        document.getElementById("weatherOutput1").textContent = '';
        document.getElementById("weatherOutput2").textContent = '';
        document.getElementById("weatherOutput3").textContent = '';
        document.body.style.backgroundImage = "url('weather.jpg')";
    }
});