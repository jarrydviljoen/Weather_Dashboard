from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/weather', methods=['GET'])
def get_weather():
    # Get the city name from the query parameter
    location = request.args.get('location')
    # Check if location is provided
    if not location:
        return jsonify({"error": "City name is required."}), 400

    # Your OpenWeatherMap API key
    api_key = "58f1b0ec1bbc006a4531bbe696f59cca"  # Your actual API key

    # Construct the API request URL
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
    
    # Send the request to the API
    response = requests.get(url)
