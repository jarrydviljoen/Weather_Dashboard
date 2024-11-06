// API keys for AccuWeather and OpenWeatherMap services
const apiKey = 'tbb1YeTlEElpzlqCPTNvDmznoTBcAxB3'; // Replace with your actual AccuWeather API key
const openWeatherApiKey = '58f1b0ec1bbc006a4531bbe696f59cca'; // Replace with your actual OpenWeatherMap API key

// References for temperature and precipitation charts
let temperatureChart; // Reference for temperature chart
let precipitationChart; // Reference for precipitation chart

/**
 * Function to show the registration form when the "Register Here" button is clicked.
 */
function showRegisterForm() {
    document.getElementById('registerSection').style.display = 'block';
}

/**
 * Handles user registration. It collects the user's details, sends them to the backend for processing, 
 * and displays a success or error message.
 */
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Send the registration data to the backend
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();
        alert(data.message);
        if (data.success) {
            window.location.href = 'login.html';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

/**
 * Handles user login. It validates the user's credentials by sending them to the backend for verification 
 * and then redirects the user based on the response.
 */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Send login data to the backend for validation
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        alert(data.message);
        if (data.success) {
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

/**
 * Fetches weather data for a given city by getting its location key and displaying both current weather 
 * and forecast information.
 */
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const locationKey = await getLocationKey(city);
        displayCurrentWeather(locationKey);
        displayForecast(locationKey, city); // Pass city to use with OpenWeatherMap API
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
}

/**
 * Helper function to get the location key for a given city from AccuWeather API.
 * @param {string} city - The name of the city to look up.
 * @returns {Promise<string>} - The location key for the city.
 */
async function getLocationKey(city) {
    const response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?q=${city}&apikey=${apiKey}`);
    const data = await response.json();
  
    if (data && data.length > 0) {
        return data[0].Key;
    } else {
        throw new Error(`City "${city}" not found.`);
    }
}

/**
 * Displays current weather data for the given location key by fetching it from the AccuWeather API.
 * @param {string} locationKey - The location key for the city.
 */
async function displayCurrentWeather(locationKey) {
    const response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`);
    const data = await response.json();

    const currentWeatherContainer = document.getElementById('currentWeatherData');
    currentWeatherContainer.innerHTML = `
        <div class="weather-card">
            <p>Temperature: ${data[0].Temperature.Metric.Value}°C</p>
            <p>Condition: ${data[0].WeatherText}</p>
        </div>
    `;
}

/**
 * Displays a 5-day weather forecast by fetching data from the AccuWeather API and displaying it.
 * @param {string} locationKey - The location key for the city.
 * @param {string} city - The city name to display.
 */
async function displayForecast(locationKey, city) {
    const response = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`);
    const data = await response.json();

    const forecastContainer = document.getElementById('forecastData');
    forecastContainer.innerHTML = data.DailyForecasts.map(day => `
        <div class="weather-card">
            <p>Date: ${new Date(day.Date).toLocaleDateString()}</p>
            <p>Max Temp: ${((day.Temperature.Maximum.Value - 32) * 5 / 9).toFixed(2)}°C</p>
            <p>Min Temp: ${((day.Temperature.Minimum.Value - 32) * 5 / 9).toFixed(2)}°C</p>
            <p>Condition: ${day.Day.IconPhrase}</p>
        </div>
    `).join('');

    const labels = data.DailyForecasts.map(day => new Date(day.Date).toLocaleDateString());
    const maxTemps = data.DailyForecasts.map(day => ((day.Temperature.Maximum.Value - 32) * 5 / 9).toFixed(2));
    const minTemps = data.DailyForecasts.map(day => ((day.Temperature.Minimum.Value - 32) * 5 / 9).toFixed(2));

    // Get precipitation data from OpenWeatherMap API
    const precipChances = await getPrecipitationData(city);

    renderTemperatureChart(labels, maxTemps, minTemps);
    renderPrecipitationChart(labels, precipChances);
}

/**
 * Retrieves precipitation data for the given city from OpenWeatherMap API.
 * @param {string} city - The name of the city to fetch precipitation data for.
 * @returns {Promise<Array<number>>} - An array of precipitation probabilities for the next 5 days.
 */
async function getPrecipitationData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${openWeatherApiKey}&units=metric`);
    const data = await response.json();
    
    if (data && data.list) {
        // Map precipitation probability data for the next 5 days
        return data.list.slice(0, 5).map(entry => entry.pop * 100);
    } else {
        throw new Error('Unable to fetch precipitation data.');
    }
}

/**
 * Renders a chart showing the temperature trend using the Chart.js library.
 * @param {Array<string>} labels - Array of date labels for the x-axis.
 * @param {Array<number>} maxTemps - Array of maximum temperatures for the y-axis.
 * @param {Array<number>} minTemps - Array of minimum temperatures for the y-axis.
 */
function renderTemperatureChart(labels, maxTemps, minTemps) {
    const ctx = document.getElementById('tempChart').getContext('2d');

    if (temperatureChart) {
        temperatureChart.destroy();
    }

    temperatureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Max Temp (°C)',
                    data: maxTemps,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    label: 'Min Temp (°C)',
                    data: minTemps,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

/**
 * Renders a bar chart showing precipitation chances using the Chart.js library.
 * @param {Array<string>} labels - Array of date labels for the x-axis.
 * @param {Array<number>} precipChances - Array of precipitation chances for the y-axis.
 */
function renderPrecipitationChart(labels, precipChances) {
    const ctx = document.getElementById('precipChart').getContext('2d');

    if (precipitationChart) {
        precipitationChart.destroy();
    }

    precipitationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Precipitation Chance (%)',
                data: precipChances,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.raw.toFixed(0) + '%';
                        }
                    }
                }
            }
        }
    });
}

