// weather App

const searchBtn = document.getElementById("search-btn");
const cityNameInput = document.getElementById("city-name");
const weatherDataSection = document.querySelector(".weather-data-section");
const weatherCardClass = document.querySelector(".weather-card"); 


const apiKey = `653d7c03c1fbc88cba803316e6e9524f`




searchBtn.addEventListener('click',()=>{
    getWeatherData(cityNameInput.value);
});


function displayWeather(city, temperature, humidity, weatherIcon, weatherDescription){
    weatherDataSection.innerHTML = `<p class="city-name">${city}</p>
    <p class="temperature">${temperature}°C</p>
    <p class="humidity">Humidity:${humidity}%</p>
    <div class="weather-icon"></div>
    <p class="weather-description">${weatherDescription}</p>`
    
    
    const weatherIconClass = document.querySelector(".weather-icon");
    weatherIconClass.style.background = `url("./assets/${weatherIcon}.png")`;
    weatherIconClass.style.backgroundPosition = "center"; 
    weatherIconClass.style.backgroundSize = "cover"; 
    weatherIconClass.style.backgroundRepeat = "no-repeat"; 
    weatherCardClass.style.gridTemplateRows = '80px 1fr';
    weatherDataSection.style.padding = "1rem";

}   


async function getWeatherData(cityName) {
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const promiseData = await fetch(url);
        const weatherData = await promiseData.json();
        
        const temperature = Math.floor(weatherData.main.temp - 273.15);
        const humidity = weatherData.main.humidity;
        const city = weatherData.name;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        
        displayWeather(city, temperature, humidity,weatherIcon, weatherDescription);
    }catch(e){
        console.log(e);
        weatherDataSection.innerHTML = `error try again`;
        weatherCardClass.style.gridTemplateRows = 'auto auto';
        weatherDataSection.style.padding = "1rem";
    }
}

