document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const tempratureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "a56724c5cc300a20820bf16db3908a8c"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw some error(server)
    // server/database is always in another continent

    try {
      const weatherData = await fetchWheatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWheatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPOSE", response);

    if (!response.ok) {
      throw new Error("city not found ");
    }
    const data = await response.json();

    return data;

    //gets data
  }

  function displayWeatherData(data) {
    //display
    console.log(data);

    const { name, main, weather } = data; //destructuring the data
    cityNameDisplay.textContent = name;
     tempratureDisplay.textContent = `Temprature : ${main.temp}`;
     descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
   
  }
});
