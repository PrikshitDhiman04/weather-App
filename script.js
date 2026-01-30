document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const app = document.querySelector(".app");

  const API_KEY = "a56724c5cc300a20820bf16db3908a8c";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    return await response.json();
  }

  function displayWeatherData(data) {
    console.log("DISPLAY FUNCTION CALLED ✅");

    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    const condition = weather[0].main.toLowerCase();
    console.log("Condition:", condition);

    if (condition.includes("clear")) {
      app.style.backgroundImage = "url('clear.jpg')";
    } else if (condition.includes("cloud")) {
      app.style.backgroundImage = "url('clouds.jpg')";
    } else if (condition.includes("rain")) {
      app.style.backgroundImage = "url('rain.jpg')";
    } else if (condition.includes("snow")) {
      app.style.backgroundImage = "url('snow.jpg')";
    } else if (condition.includes("haze")) {
      app.style.backgroundImage = "url('haze.jpg')";
    } else {
      app.style.backgroundImage = "url('mist.jpg')";
    }

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
