# app.py (FastAPI app entry point)
from fastapi import FastAPI, HTTPException

from .weather_api import WeatherAPI
from .weather_display import CurrentWeatherDisplay, ForecastDisplay

app = FastAPI()

# Root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Weather Dashboard API!"}

# Initialize the WeatherAPI with the real API key
api_key = "tbb1YeTlEElpzlqCPTNvDmznoTBcAxB3"  # Replace with your actual API key
weather_api = WeatherAPI(api_key)

@app.get("/current_weather/{city_name}")
async def get_current_weather(city_name: str):
    try:
        location_key = weather_api.get_location_key(city_name)
        current_weather = weather_api.get_current_weather(location_key)
        current_weather_display = CurrentWeatherDisplay()
        return {"city": city_name, "weather": current_weather}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/forecast/{city_name}")
async def get_forecast(city_name: str):
    try:
        location_key = weather_api.get_location_key(city_name)
        forecast = weather_api.get_forecast(location_key)
        forecast_display = ForecastDisplay()
        return {"city": city_name, "forecast": forecast}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
