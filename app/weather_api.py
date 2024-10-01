import requests
import os
from dotenv import load_dotenv

# Load API key from environment variables (You can alternatively hardcode the key if not using .env)
load_dotenv()
ACCUWEATHER_API_KEY = os.getenv("ACCUWEATHER_API_KEY", "tbb1YeTlEElpzlqCPTNvDmznoTBcAxB3")  # Fallback to provided key

BASE_URL = "http://dataservice.accuweather.com"

def get_location_key(city_name: str):
    """
    Fetch the location key for a given city name using the AccuWeather API.
    The location key is necessary for making weather-related requests.
    """
    url = f"{BASE_URL}/locations/v1/cities/search"
    params = {
        "apikey": ACCUWEATHER_API_KEY,
        "q": city_name
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data:
            # Return the location key for the first result
            return data[0]['Key']
        else:
            raise ValueError("Location not found")
    else:
        raise Exception(f"Error fetching location key: {response.status_code}, {response.text}")

def get_current_weather(location_key: str):
    """
    Fetch current weather conditions for a given location key.
    """
    url = f"{BASE_URL}/currentconditions/v1/{location_key}"
    params = {
        "apikey": ACCUWEATHER_API_KEY,
        "details": "true"
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data:
            return data[0]  # Return the first (and only) result for current weather
        else:
            raise ValueError("Weather data not found")
    else:
        raise Exception(f"Error fetching current weather: {response.status_code}, {response.text}")

def get_5_day_forecast(location_key: str):
    """
    Fetch a 5-day weather forecast for a given location key.
    """
    url = f"{BASE_URL}/forecasts/v1/daily/5day/{location_key}"
    params = {
        "apikey": ACCUWEATHER_API_KEY,
        "metric": "true"  # Return temperatures in Celsius
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data['DailyForecasts']
    else:
        raise Exception(f"Error fetching 5-day forecast: {response.status_code}, {response.text}")

def get_weather_data(city_name: str):
    """
    A high-level function to fetch both current weather and a 5-day forecast for a given city name.
    """
    try:
        location_key = get_location_key(city_name)
        current_weather = get_current_weather(location_key)
        forecast = get_5_day_forecast(location_key)
        
        return {
            "current_weather": current_weather,
            "forecast": forecast
        }
    except Exception as e:
        return {"error": str(e)}
