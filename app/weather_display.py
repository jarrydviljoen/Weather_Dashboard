# weather_display.py
from abc import ABC, abstractmethod


class WeatherDisplay(ABC):
    @abstractmethod
    def display(self, weather_data):
        pass

class CurrentWeatherDisplay(WeatherDisplay):
    def display(self, weather_data):
        print("Current Weather:")
        for condition in weather_data:
            print(f"Temperature: {condition['Temperature']['Metric']['Value']}°C")
            print(f"Condition: {condition['WeatherText']}\n")

class ForecastDisplay(WeatherDisplay):
    def fahrenheit_to_celsius(self, fahrenheit):
        return (fahrenheit - 32) * 5 / 9

    def display(self, weather_data):
        print("5-Day Forecast:")
        for day in weather_data['DailyForecasts']:
            max_temp_f = day['Temperature']['Maximum']['Value']
            min_temp_f = day['Temperature']['Minimum']['Value']

            # Convert to Celsius
            max_temp_c = self.fahrenheit_to_celsius(max_temp_f)
            min_temp_c = self.fahrenheit_to_celsius(min_temp_f)

            print(f"Date: {day['Date']}")
            print(f"Max Temp: {max_temp_c:.2f}°C")
            print(f"Min Temp: {min_temp_c:.2f}°C")
            print(f"Condition: {day['Day']['IconPhrase']}\n")
