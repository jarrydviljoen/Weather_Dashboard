from fastapi import FastAPI
from .weather_api import get_weather_data

app = FastAPI()

@app.get("/weather/{city_name}")
def get_weather(city_name: str):
    """
    Endpoint to fetch weather data for a given city.
    """
    weather_data = get_weather_data(city_name)
    if "error" in weather_data:
        return {"error": weather_data["error"]}
    return weather_data
