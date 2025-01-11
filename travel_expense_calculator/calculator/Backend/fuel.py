#routerurl = https://router.hereapi.com/v8/routes?transportMode=car&origin=52.5308,13.3847&destination=52.5264,13.3686&return=summary&apikey=ff6YTg6m97yDH6m4fiU7snrWDgSaD4jSFvTq_I_0hBA

import requests
from dotenv import load_dotenv
import os

load_dotenv()

# def geocode_city(api_key, city_name):
#     """
#     This function geocodes a city name using the HERE Geocoding API to get its latitude and longitude.
#     """
#     url = f"https://geocode.search.hereapi.com/v1/geocode"
#     params = {
#         'q': city_name,  # City name (e.g., "Berlin")
#         'apiKey': api_key
#     }

#     response = requests.get(url, params=params)
    
#     if response.status_code == 200:
#         data = response.json()
#         if 'items' in data and len(data['items']) > 0:
#             lat = data['items'][0]['position']['lat']
#             lon = data['items'][0]['position']['lng']
#             return (lat, lon)
#         else:
#             print(f"City '{city_name}' not found.")
#             return None
#     else:
#         print(f"Error in geocoding: {response.status_code}")
#         return None

# def get_distance_here(api_key, origin, destination):
#     """
#     This function calculates the distance between two cities using the HERE Routing API (v8).
#     """
#     # Geocode both origin and destination city names to get their coordinates
#     origin_coords = geocode_city(api_key, origin)
#     destination_coords = geocode_city(api_key, destination)
    
#     if origin_coords and destination_coords:
#         origin_coords_str = f"{origin_coords[0]},{origin_coords[1]}"  # "latitude,longitude"
#         destination_coords_str = f"{destination_coords[0]},{destination_coords[1]}"
        
#         # Construct the URL for the HERE Routing API v8
#         url = f"https://router.hereapi.com/v8/routes"
        
#         # Parameters for the request
#         params = {
#             'apiKey': api_key,
#             'transportMode': 'car',  # Use 'car' mode for the fastest route by car
#             'origin': origin_coords_str,  # Origin point (latitude,longitude)
#             'destination': destination_coords_str,  # Destination point (latitude,longitude)
#             'return': 'summary'  # Return the summary of the route (distance, duration, etc.)
#         }

#         # Send GET request to HERE Routing API v8
#         response = requests.get(url, params=params)
        
#         if response.status_code == 200:
#             data = response.json()
            
#             # Extract the distance from the response (in meters)
#             if 'routes' in data:
#                 distance = data['routes'][0]['sections'][0]['summary']['length'] / 1000  # Distance in kilometers
#                 print(f"Distance between {origin} and {destination}: {distance} km")
#                 return distance
#             else:
#                 print("No routes found.")
#                 return None
#         else:
#             print(f"Error in routing: {response.status_code}")
#             return None
#     else:
#         print("Could not get coordinates for the cities.")
#         return None

# # Example usage with city names
# api_key = os.getenv('HEREMAPSKEY')  # Replace with your HERE API key
# origin_city = "Mumbai"
# destination_city = "Pune"

# get_distance_here(api_key, origin_city, destination_city)

def fuel(origin_city, destination_city, fuel_type):
    def geocode_city(api_key, city_name):
        url = f"https://geocode.search.hereapi.com/v1/geocode"
        params = {
            'q': city_name,  # City name (e.g., "Berlin")
            'apiKey': api_key
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            if 'items' in data and len(data['items']) > 0:
                lat = data['items'][0]['position']['lat']
                lon = data['items'][0]['position']['lng']
                return (lat, lon)
            else:
                print(f"City '{city_name}' not found.")
                return None
        else:
            print(f"Error in geocoding: {response.status_code}")
            return None

    def get_distance_here(api_key, origin, destination):
        # Geocode both origin and destination city names to get their coordinates
        origin_coords = geocode_city(api_key, origin)
        destination_coords = geocode_city(api_key, destination)

        if origin_coords and destination_coords:
            origin_coords_str = f"{origin_coords[0]},{origin_coords[1]}"  # "latitude,longitude"
            destination_coords_str = f"{destination_coords[0]},{destination_coords[1]}"

            url = f"https://router.hereapi.com/v8/routes"

            # Parameters for the request
            params = {
                'apiKey': api_key,
                'transportMode': 'car',
                'origin': origin_coords_str,  # Origin point (latitude,longitude)
                'destination': destination_coords_str,  # Destination point (latitude,longitude)
                'return': 'summary'  # Return the summary of the route (distance, duration, etc.)
            }

            response = requests.get(url, params=params)

            if response.status_code == 200:
                data = response.json()

                # Extract the distance from the response (in meters)
                if 'routes' in data:
                    distance_km = data['routes'][0]['sections'][0]['summary']['length'] / 1000  # Distance in kilometers
                    # print(f"Distance between {origin} and {destination}: {distance_km} km")
                    return distance_km
                else:
                    print("No routes found.")
                    return None
            else:
                print(f"Error in routing: {response.status_code}")
                return None
        else:
            print("Could not get coordinates for the cities.")
            return None

    def calculate_fuel_needed(distance_km, fuel_efficiency):

        fuel_needed = (distance_km * fuel_efficiency) / 100  # in liters
        return fuel_needed

    def calculate_fuel_cost(fuel_needed, fuel_price_per_liter):
        """
        This function calculates the fuel cost based on fuel needed and fuel price per liter.

        Parameters:
        - fuel_needed: Fuel needed in liters.
        - fuel_price_per_liter: Price of fuel per liter.

        Returns:
        - Fuel cost in the local currency.
        """
        fuel_cost = fuel_needed * fuel_price_per_liter
        return fuel_cost

    api_key = os.getenv('HEREMAPSKEY')
    # origin_city = "Mumbai"
    # destination_city = "Delhi"

    fuel_efficiency_petrol = 18  #liters per 100 km
    fuel_efficiency_diesel = 23  #liters per 100 km

    fuel_price_petrol = 105.47  # Price of petrol per liter
    fuel_price_diesel = 87.91  # Price of diesel per liter

    distance_km = get_distance_here(api_key, origin_city, destination_city)

    # If distance is valid, calculate fuel needs and costs for both petrol and diesel
    if distance_km:
        if fuel_type == "petrol":
            fuel_needed_petrol = calculate_fuel_needed(distance_km, fuel_efficiency_petrol)
            # print(f"Fuel needed for the trip (Petrol): {fuel_needed_petrol:.2f} liters")

            fuel_cost = calculate_fuel_cost(fuel_needed_petrol, fuel_price_petrol)
            # print(f"Fuel cost for the trip (Petrol): {fuel_cost:.2f} INR")

        elif fuel_type == "diesel":
            fuel_needed_diesel = calculate_fuel_needed(distance_km, fuel_efficiency_diesel)
            # print(f"Fuel needed for the trip (Diesel): {fuel_needed_diesel:.2f} liters")

            fuel_cost = calculate_fuel_cost(fuel_needed_diesel, fuel_price_diesel)
            # print(f"Fuel cost for the trip (Diesel): {fuel_cost:.2f} INR")
    return fuel_cost

# fuel()