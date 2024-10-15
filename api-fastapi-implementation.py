from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()
@app.get("/weather")
async def get_weather(location: str):
    if not location:
        raise HTTPException(status_code=400, detail="City name is required.")

    # API key
    api_key = "58f1b0ec1bbc006a4531bbe696f59cca"  

    # API request URL
    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
