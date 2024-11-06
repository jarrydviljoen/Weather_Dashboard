
# Weather Dashboard Project

A weather dashboard web application that provides users with weather updates and forecasts using OpenWeatherMap and AccuWeather APIs. This project includes client-side visualizations with charts and icons, automated tests, and optimized styling using FastHTML and CSS.

## Table of Contents
- [Project Summary](#project-summary)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Development Process Overview](#development-process-overview)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Future Improvements](#future-improvements)

## Project Summary
This weather dashboard allows users to access real-time weather information and forecasts, view data visualizations, and receive updates on precipitation, temperature, and other weather conditions. The project leverages FastHTML for HTML templating and features a responsive, user-friendly interface.

## Project Structure

### Frontend
- **index.html**: Main page where users enter the city name and view weather details, forecast, and visualizations.
- **login.html**: Login page with authentication form and registration options.
- **styles.css**: Stylesheet for the entire application, ensuring a consistent and responsive design.
- **script.js**: Handles API requests, DOM manipulation, and data visualization.

### Backend
- **server.js**: Sets up the Express server, handles API requests, and manages routing.
- **package.json** & **package-lock.json**: Manage dependencies and include scripts for server startup, testing, and linting.

## Features

- **Current Weather Display**: Real-time data on temperature and conditions.
- **5-Day Weather Forecast**: 5-day forecast, displayed as cards for easy viewing.
- **Data Visualization**: Temperature trends and precipitation probability charts using Chart.js.
- **Responsive Design**: Adapts to various screen sizes, providing a smooth experience on both desktop and mobile.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Chart.js
- **Backend**: Node.js, Express.js
- **API**: OpenWeatherMap API, Accuweather API
- **Testing**: Mocha

## API Integration

- **Openweathermap**: This API was used to retieve precipitation data for the bar chart.
- **Accuweather**: This API was used for all the other data including current weather and 5-forecast.

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jarrydviljoen/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Install dependencies**:
   - Use `pip install -r requirements.txt` to install required packages.
   - Alternatively, if there are issues, manually install:
     ```bash
     pip install chartjs nodejs express-py
     ```

3. **Run the server**:
   - Start the server with:
     ```bash
     node server.js
     ```
   - The application should be accessible at `http://localhost:3000`.

## Development Process Overview
The project was developed with the following features and tools:
- **Backend**: Node.js, Express, and Python modules for handling API requests and data manipulation.
- **Frontend**: FastHTML and CSS for styling, with interactive charts powered by Chart.js.
- **Testing**: Tests were written using Mocha and Chai for both frontend and backend functionality.
- **Documentation**: Docstrings and comments have been included in the code for clarity.

## Running the Server
To start the application, run the following command in the root directory:
```bash
node server.js
```

The server will start on `http://localhost:3000`.

## Testing
Automated tests are included for key functionalities:
- **User Registration** and **Login** endpoints
- **Weather Data Fetching** and **Display**

To run the tests:
```bash
npm test
```

## Future Improvements
- Implementing OAuth for secure user authentication.
- Adding additional data visualizations for air quality, humidity, and wind speed.
- Expanding the interface to support multiple languages.
- Integrating caching to improve API response times and reduce load.

---

This project showcases the integration of modern web development technologies and provides an engaging, functional interface for weather data.
