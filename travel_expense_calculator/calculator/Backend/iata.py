import requests
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Fetch API credentials from environment variables
API_KEY = os.getenv("FLIGHTAPIKEY")
access_token = os.getenv("FLIGHTACCESSTOK")

def get_iata_code(city_name, access_token):
    """Fetch IATA code for a city using Amadeus API."""
    url = "https://test.api.amadeus.com/v1/reference-data/locations"
    headers = {
        "Authorization": f"Bearer {access_token}",
    }
    params = {
        "keyword": city_name,
        "subType": "CITY",
    }
    
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        try:
            # Extract IATA code from the response
            iata_code = data["data"][0]["iataCode"]
            return iata_code
        except (IndexError, KeyError):
            return f"IATA code for {city_name} not found."
    else:
        return f"Error: {response.status_code}, {response.text}"

# Call the function and print the result
city = "Mumbai"
iata_code = get_iata_code(city, access_token=access_token)
print(f"IATA code for {city}: {iata_code}")
