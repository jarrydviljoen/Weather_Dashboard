# Weather Dashboard

The Weather Dashboard is a full-stack web application that provides real-time weather information, 5-day forecasts, and air quality data for a specified city. Built with Node.js, Express, HTML, CSS, and JavaScript, this application integrates with the OpenWeatherMap API to deliver comprehensive and up-to-date weather information.

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Integration](#api-integration)
- [Installation](#installation)
- [Usage](#usage)
- [Testing and Validation](#testing-and-validation)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Project Structure

### Frontend
- **index.html**: Main page where users enter the city name and view weather details, forecast, and visualizations.
- **login.html**: Login page with authentication form and registration options.
- **styles.css**: Stylesheet for the entire application, ensuring a consistent and responsive design.
- **script.js**: Handles API requests, DOM manipulation, and data visualization.

### Backend
- **server.js**: Sets up the Express server, handles API requests, and manages routing.
- **index.js**: Middleware and content negotiation functions for efficient response handling.
- **package.json** & **package-lock.json**: Manage dependencies and include scripts for server startup, testing, and linting.

### Additional Files
- **LICENSE**: Contains licensing information for the project.
- **HISTORY.md**: Tracks changes and version history for the project.

## Features

- **Current Weather Display**: Real-time data on temperature, humidity, wind speed, and conditions.
- **5-Day Weather Forecast**: 5-day forecast at 3-hour intervals, displayed as cards for easy viewing.
- **Data Visualization**: Temperature trends and precipitation probability charts using Chart.js.
- **Responsive Design**: Adapts to various screen sizes, providing a smooth experience on both desktop and mobile.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Backend**: Node.js, Express.js
- **API**: OpenWeatherMap API
- **Testing**: Mocha, NYC
- **Code Quality**: ESLint

## API Integration

The Weather Dashboard integrates with the OpenWeatherMap API for weather and air quality data:

1. **Current Weather API**
   - **Endpoint**: `https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_KEY}`
   - **Data Provided**: Current temperature, humidity, wind speed, and weather conditions.

2. **5-Day Forecast API**
   - **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={API_KEY}`
   - **Data Provided**: Forecast data at 3-hour intervals for five days.


The backend (`server.js`) handles API calls and relays data to the frontend, ensuring that users see up-to-date weather and environmental information.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/weather-dashboard.git

   Navigate to the Project Directory
cd weather-dashboard
Install Dependencies
npm install
Environment Setup
Create an .env file with your OpenWeatherMap API key:
API_KEY=your_openweathermap_api_key
Start the Server
npm start
The server will run on http://localhost:3000.

Usage

Open http://localhost:3000 in your web browser.
Enter a city name in the input field and click "Get Weather" to view current weather details, a 5-day forecast, and air quality data.
Use the login page (login.html) for authentication features (if implemented).
Testing and Validation

The project uses Mocha and NYC for testing and coverage, and ESLint for code quality:

Run Tests:
npm test
Code Linting:
npm run lint
Testing includes unit tests for API responses, data processing, and frontend data rendering, while linting ensures consistent code style.

Challenges and Solutions

API Rate Limits: Managed by implementing error handling to notify users when API limits are reached.
Cross-Origin Resource Sharing (CORS): Integrated cors middleware in server.js to allow the frontend to communicate with the backend across origins.
Error Handling: Backend includes mechanisms to handle missing or incorrect data, returning error messages to the frontend for user feedback.

Future Enhancements
User Authentication: Implement secure authentication, potentially using OAuth or JWT.
Favorite Cities: Allow users to save and quickly access weather data for favorite cities.
Enhanced Data Visualization: Add more detailed weather metrics, like humidity and wind speed, to the charts.
Improved Air Quality Visualization: Display air quality data with more granularity, such as real-time pollutant charts.

