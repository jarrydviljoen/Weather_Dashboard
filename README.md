uvicorn main:app --reload

# Weather Dashboard - FastAPI Integration

This is the second part of the Weather Dashboard project, implemented using **FastAPI**. The application fetches weather data from OpenWeatherMap and displays it to users. 

## Features

- **FastAPI** framework for building APIs.
- Integration with **OpenWeatherMap** to get weather data for a given city.
- Handles error responses if the city is not found.
- Provides temperature, weather description, humidity, and wind speed.

## Requirements

To install the required dependencies, use the following command:

```bash
pip install -r requirements.txt
