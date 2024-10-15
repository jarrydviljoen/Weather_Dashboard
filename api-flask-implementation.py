from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/weather', methods=['GET'])
def get_weather():
    # Get the city name from the query parameter
    location = request.args.get('location')
