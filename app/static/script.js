
const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Mauritius';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '920c60aaacmsh4299c10ef6d0dcbp1d18f2jsn5ac3f4984f97',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

document.addEventListener('DOMContentLoaded', function() {
    // Get form and canvas elements
    const form = document.getElementById('weatherForm');
    const cityInput = document.getElementById('cityInput');
    const temperatureChartElement = document.getElementById('temperatureChart').getContext('2d');
    const pressureChartElement = document.getElementById('pressureChart').getContext('2d');

    // Declare chart variables to allow chart destruction before re-rendering
    let temperatureChart, pressureChart;

    // Add event listener for the form submit event
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const city = cityInput.value.trim();

        if (city) {
            fetchWeather(city);
        }
    });

    // Function to fetch the current weather data
    function fetchWeather(city) {
        fetch(`/weather?city=${city}`)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
                fetchForecast(city);
            })
            .catch(error => console.error('Error fetching weather:', error));
    }

    // Function to fetch the weather forecast data
    function fetchForecast(city) {
        fetch(`/forecast?city=${city}`)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
                updateTemperatureChart(data);
                updatePressureChart(data);  // Update the new pressure chart
            })
            .catch(error => console.error('Error fetching forecast:', error));
    }

    // Function to display the current weather information
    function displayCurrentWeather(data) {
        const currentWeatherContainer = document.getElementById('current-weather');
        currentWeatherContainer.innerHTML = `
            <h3>${data.city}</h3>
            <img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" alt="${data.description}">
            <p>${data.temperature}°C - ${data.description}</p>
            <p>Pressure: ${data.pressure} hPa</p>  <!-- Display pressure in current weather -->
        `;
    }

    // Function to display the 5-day forecast
    function displayForecast(data) {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';

        data.forecast.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <h4>${new Date(day.datetime).toLocaleDateString()}</h4>
                <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.description}">
                <p>${day.temperature}°C - ${day.description}</p>
            `;
            forecastContainer.appendChild(forecastItem);
        });
    }

    // Function to update the temperature chart
    function updateTemperatureChart(data) {
        const labels = data.forecast.map(item => new Date(item.datetime).toLocaleDateString());
        const temperatures = data.forecast.map(item => item.temperature);

        // Destroy previous chart if it exists
        if (temperatureChart) {
            temperatureChart.destroy();
        }

        // Create new temperature chart
        temperatureChart = new Chart(temperatureChartElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Temperature (°C)',
                    data: temperatures,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // Function to update the pressure chart
    function updatePressureChart(data) {
        const labels = data.forecast.map(item => new Date(item.datetime).toLocaleDateString());
        const pressures = data.forecast.map(item => item.pressure);  // Make sure 'pressure' exists in data

        // Destroy previous chart if it exists
        if (pressureChart) {
            pressureChart.destroy();
        }

        // Create new pressure chart
        pressureChart = new Chart(pressureChartElement, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Pressure (hPa)',
                    data: pressures,  // Ensure this is populated correctly
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
});


