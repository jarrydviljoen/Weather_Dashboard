# tests/test_weather.py
import unittest
from unittest.mock import patch
from weather_api import WeatherAPI


class TestWeatherAPI(unittest.TestCase):
    def setUp(self):
        self.api_key = "test_api_key"
        self.weather_api = WeatherAPI(self.api_key)
        self.city_name = "New York"

    @patch('requests.get')
    def test_get_location_key(self, mock_get):
        # Mock response for location key search
        mock_response = [{"Key": "12345", "LocalizedName": "New York"}]
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        # Call the method
        location_key = self.weather_api.get_location_key(self.city_name)

        # Assert the result
        self.assertEqual(location_key, "12345")

    @patch('requests.get')
    def test_get_current_weather(self, mock_get):
        # Mock response for current weather
        mock_response = [{
            "Temperature": {"Metric": {"Value": 22.0}},
            "WeatherText": "Sunny"
        }]
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        # Assume location_key lookup is mocked
        with patch.object(self.weather_api, 'get_location_key', return_value="12345"):
            current_weather = self.weather_api.get_current_weather("12345")

        # Assert the results
        self.assertIsInstance(current_weather, list)
        self.assertEqual(current_weather[0]['Temperature']['Metric']['Value'], 22.0)
        self.assertEqual(current_weather[0]['WeatherText'], "Sunny")

    @patch('requests.get')
    def test_get_forecast(self, mock_get):
        # Mock response for 5-day forecast
        mock_response = {
            "DailyForecasts": [
                {
                    "Date": "2024-10-07",
                    "Temperature": {
                        "Maximum": {"Value": 75.0},  # Fahrenheit
                        "Minimum": {"Value": 55.0}
                    },
                    "Day": {"IconPhrase": "Partly Cloudy"}
                }
            ]
        }
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = mock_response

        # Assume location_key lookup is mocked
        with patch.object(self.weather_api, 'get_location_key', return_value="12345"):
            forecast = self.weather_api.get_forecast("12345")

        # Assert the results
        self.assertIsInstance(forecast, dict)
        self.assertIn('DailyForecasts', forecast)
        self.assertEqual(forecast['DailyForecasts'][0]['Temperature']['Maximum']['Value'], 75.0)
        self.assertEqual(forecast['DailyForecasts'][0]['Day']['IconPhrase'], "Partly Cloudy")

if __name__ == '__main__':
    unittest.main()
