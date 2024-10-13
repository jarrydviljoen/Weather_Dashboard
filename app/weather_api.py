# weather_api.py
import requests
from abc import ABC, abstractmethod

class WeatherAPI:
    def __init__(self, api_key: str):
        self.__api_key = api_key  # Encapsulate API key
        self.base_url = "http://dataservice.accuweather.com/"

    def __get_request(self, endpoint: str, params: dict):
        params['apikey'] = self.__api_key
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        response.raise_for_status()
        return response.json()

    def get_location_key(self, city_name: str):
        endpoint = "locations/v1/cities/search"
        params = {"q": city_name}
        response = self.__get_request(endpoint, params)
        if response:
            return response[0]['Key']  # Return the first match's location key
        else:
            raise ValueError(f"City '{city_name}' not found")

    def get_current_weather(self, location_key: str):
        endpoint = f"currentconditions/v1/{location_key}"
        return self.__get_request(endpoint, {})

    def get_forecast(self, location_key: str):
        endpoint = f"forecasts/v1/daily/5day/{location_key}"
        return self.__get_request(endpoint, {})
