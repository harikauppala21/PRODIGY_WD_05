document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "YOUR_API_KEY_HERE";
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");

  getWeatherBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();
    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((response) => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then((data) => {
        cityName.textContent = `📍 ${data.name}, ${data.sys.country}`;
        temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
        description.textContent = `☁ Weather: ${data.weather[0].description}`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
      })
      .catch((error) => {
        cityName.textContent = "";
        temperature.textContent = "";
        description.textContent = "";
        humidity.textContent = "";
        alert("Error: " + error.message);
      });
  });
});




