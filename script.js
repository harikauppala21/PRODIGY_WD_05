const apiKey = "YOUR_API_KEY_HERE"; // replace with your key for local testing

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather(city) {
  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p>${error.message}</p>`;
  }
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;

  weatherInfo.innerHTML = `
    <h3>${name}</h3>
    <p><strong>Temperature:</strong> ${main.temp} °C</p>
    <p><strong>Condition:</strong> ${weather[0].main}</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
  `;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(cityInput.value.trim());
  }
});

