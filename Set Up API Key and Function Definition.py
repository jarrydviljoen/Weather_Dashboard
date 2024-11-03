import requests

# Your API key
api_key = "58f1b0ec1bbc006a4531bbe696f59cca"

def get_weather_data(api_key, location):
    # Create the URL for the API request.
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
    
    # Send the request to the OpenWeatherMap API
    response = requests.get(url)
    
    # Verify whether the request was fulfilled.
    if response.status_code == 200:
        return response.json()  # Return the weather data as JSON
    else:
        print("Error:", response.status_code)  # Print the error code
        print(response.text)  # Print the error message from the API
        return None
# Prompt for city name
location = input("Enter the city name: ").strip()  # Get user input and remove extra spaces

# Retrieve the climatic information
weather_data = get_weather_data(api_key, location)
# Display the weather data if it's valid
if weather_data:
    temp = weather_data['main']['temp']  # Measure the temperature
    description = weather_data['weather'][0]['description']  # Measure weather description
    humidity = weather_data['main']['humidity']  # Measure humidity
    wind_speed = weather_data['wind']['speed']  # Measure wind speed
    
    # Print the weather information
    print(f"The current temperature in {location} is {temp}°C with {description}.")
    print(f"Humidity: {humidity}%")
    print(f"Wind Speed: {wind_speed} m/s")
else:
    print("Could not retrieve weather data.")
