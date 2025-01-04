# the accesstoken expires after 1799 secs. hit req at https://test.api.amadeus.com/v1/security/oauth2/token?grant_type=client_credentials&client_id=uDwYiy2o4YMafh27lz6wRu3gUZH5TTA9&client_secret=NtluIlGG9pAiDSKd
import requests
import json
from dotenv import load_dotenv
import os
import statistics

load_dotenv()

# Function to get flight prices from Amadeus API
def get_flight_prices(departure_location, arrival_location, departure_date, return_date=None):
    client_id = os.getenv('FLIGHTAPIKEY')  # Replace with your Amadeus API client ID
    client_secret = os.getenv('FLIGHTSEC')  # Replace with your Amadeus API client secret
    
    # Step 1: Get an access token
    auth_url = 'https://test.api.amadeus.com/v1/security/oauth2/token'
    auth_data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret
    }
    
    # Get the access token
    auth_response = requests.post(auth_url, data=auth_data)
    
    if auth_response.status_code == 200:
        access_token = auth_response.json()['access_token']
    else:
        print(f"Error getting access token: {auth_response.status_code}")
        return
    
    # Step 2: Make the flight search request
    flight_search_url = f'https://test.api.amadeus.com/v2/shopping/flight-offers'
    access_token = os.getenv('FLIGHTACCESSTOK')
    
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    params = {
        'originLocationCode': departure_location,
        'destinationLocationCode': arrival_location,
        'departureDate': departure_date,
        'returnDate': return_date if return_date else '',
        'adults': 1,  # You can specify more passengers here if needed
        'currencyCode': 'USD'
    }
    
    # Send the flight search request
    response = requests.get(flight_search_url, headers=headers, params=params)
    
    if response.status_code == 200:
        # Parse and print the flight offers
        data = response.json()
        
        # if 'data' in data:
        #     for flight in data['data']:
        #         price = flight['price']['total']
        #         airline = flight['validatingAirlineCodes'][0]
        #         departure = flight['itineraries'][0]['segments'][0]['departure']['at']
        #         arrival = flight['itineraries'][0]['segments'][-1]['arrival']['at']
                
        #         print(f"Price: {price} USD, Airline: {airline}, Departure: {departure}, Arrival: {arrival}")
        # else:
        #     print("No flight offers found.")

        if 'data' in data:
            prices = []
            
            for flight in data['data']:
                price = float(flight['price']['total'])
                prices.append(price)
            
            if prices:
                # Calculate the average and median prices
                # average_price = sum(prices) / len(prices)
                average_price = statistics.mean(prices)
                median_price = statistics.median(prices)
                max_price = max(prices)
                min_price = min(prices)
                
                # Print the results
                print(f"Average Price: {average_price:.2f} USD")
                print(f"Median Price: {median_price:.2f} USD")
                print(f"Max Price: {max_price:.2f} USD")
                print(f"Min Price: {min_price:.2f} USD")
                
                # Optionally, print the list of prices
                # print("Flight Prices: ", prices)
            else:
                print("No valid flight prices found.")
        else:
            print("No flight offers found.")
    else:
        print(f"Error searching for flights: {response.status_code}")

    return average_price, median_price, max_price, min_price

# Example usage
departure_location = "SFO"  # San Francisco (IATA code)
arrival_location = "LAX"    # Los Angeles (IATA code)
departure_date = "2025-01-15"  # Format: YYYY-MM-DD
return_date = "2025-01-22"  # Optional: For round trips, add return date (Format: YYYY-MM-DD)

get_flight_prices(departure_location, arrival_location, departure_date, return_date)
