# main.py
from weather_api import WeatherAPI
from weather_display import CurrentWeatherDisplay, ForecastDisplay

def main():
    api_key = "tbb1YeTlEElpzlqCPTNvDmznoTBcAxB3"  # API key used to access weather data from Accuweather
    
    # Encapsulate API access
    weather_api = WeatherAPI(api_key)
    
    while True:
        # Prompt user to enter a city name or exit
        city_name = input("Enter the city name (or type 'exit' to quit): ").strip()
        
        if city_name.lower() in ["exit", "quit"]:
            print("Exiting the weather dashboard.")
            break
        
        try:
            # Fetch location key using city name
            location_key = weather_api.get_location_key(city_name)
            
            # Fetch current weather and forecast using location key
            current_weather = weather_api.get_current_weather(location_key)
            forecast = weather_api.get_forecast(location_key)
            
            # Polymorphism: Display current weather and forecast
            current_weather_display = CurrentWeatherDisplay()
            forecast_display = ForecastDisplay()
            
            current_weather_display.display(current_weather)
            forecast_display.display(forecast)
        
        except ValueError as e:
            print(e)

if __name__ == "__main__":
    main()
