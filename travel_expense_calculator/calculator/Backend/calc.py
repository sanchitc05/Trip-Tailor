from .flightfare import get_flight_prices
from .fuel import fuel
from .tickets import get_fare
from .hotels import get_accommodation_cost
import requests
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

# Fetch API credentials from environment variables
API_KEY = os.getenv("FLIGHTAPIKEY")
# access_token = os.getenv("FLIGHTACCESSTOK")
# access_token = authenticate()
access_token = 'UvLoJyUGdlANHdsjHkjUvO2cyTkW'

def calculate_expense(source, destination, mode, departure_date=None, return_date=None, fuel_type=None, bus_type=None, train_class=None, accommodation_type=None):
    # Authenticate and get an access token
    def authenticate():
        url = "https://test.api.amadeus.com/v1/security/oauth2/token"
        params = {
            'grant_type': 'client_credentials',
            'client_id': API_KEY,
            'client_secret': os.getenv("FLIGHTSEC"),
        }

        response = requests.post(url, data=params)
        if response.status_code == 200:
            access_token = response.json().get('access_token')
            return access_token
        else:
            print("Error authenticating:", response.text)
            return None
        
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

    # Handle mode-specific calculations
    if mode == "flight":
        if not departure_date:
            raise ValueError("Departure date is required for flight mode.")
        dep_iata = get_iata_code(source, access_token)
        arrival_iata = get_iata_code(destination, access_token)
        average_price, median_price, max_price, min_price = get_flight_prices(dep_iata, arrival_iata, departure_date, return_date)
        if median_price is not None:
            fare = median_price
        else:
            raise ValueError("Could not retrieve flight prices.")
    elif mode == "car":
        if not fuel_type:
            raise ValueError("Fuel type is required for car mode.")
        fare = fuel(source, destination, fuel_type)
    elif mode == "bus":
        fare = get_fare(mode, source, destination, bus_type=bus_type)
    elif mode == "train":
        fare = get_fare(mode, source, destination, train_class=train_class)
    else:
        raise ValueError("Invalid mode of transport.")

    accommodation_cost = get_accommodation_cost(destination, accommodation_type)
    # fared = float(fare)
    fare = float(f'{fare:.2f}')
    accommodation_cost = float(accommodation_cost)
    total_expense = fare + accommodation_cost
    total_expense = float(f'{total_expense:.2f}')

    return {
        "fare": fare,
        "accommodation_cost": accommodation_cost,
        "total_expense": total_expense,
    }



# def calculate_expense(source, destination, mode):
#     def get_iata_code(city_name, access_token):
#         """Fetch IATA code for a city using Amadeus API."""
#         url = "https://test.api.amadeus.com/v1/reference-data/locations"
#         headers = {
#             "Authorization": f"Bearer {access_token}",
#         }
#         params = {
#             "keyword": city_name,
#             "subType": "CITY",
#         }

#         response = requests.get(url, headers=headers, params=params)
#         if response.status_code == 200:
#             data = response.json()
#             try:
#                 # Extract IATA code from the response
#                 iata_code = data["data"][0]["iataCode"]
#                 return iata_code
#             except (IndexError, KeyError):
#                 return f"IATA code for {city_name} not found."
#         else:
#             return f"Error: {response.status_code}, {response.text}"


# #     #inputs
# #     # valid_modes = ["flight", "car", "bus", "train"]
# #     # mode = input("Enter mode of transport(Flight/Car/Bus/Train): ").lower()
# #     # while mode not in valid_modes:
# #     #     print("Invalid mode of transport. Please enter 'Flight', 'Car', 'Bus', 'Train'.")
# #     #     mode = input("Enter mode of transport(Flight/Car/Bus/Train): ").lower()
# #     # source = input("Enter source city: ").lower()
# #     # destination = input("Enter destination city: ").lower()



# #     if mode == "flight":
# #         # departure_location = source
# #         # arrival_location = destination
# #         departure_date = input("Enter departure date(YYYY-MM-DD): ")
# #         return_date = input("Enter return date(YYYY-MM-DD): ")
# #         dep_iata= get_iata_code(source, access_token)
# #         arrival_iata= get_iata_code(destination, access_token)
# #         average_price, median_price, max_price, min_price = get_flight_prices(dep_iata, arrival_iata, departure_date, return_date)
# #         if median_price is not None:
# #             fare = median_price
# #             print('median price:',fare)
# #         else:
# #             print('could not get flight price')
# #     elif mode == "car":
# #         fuel_type = input("Enter fuel type(Petrol/Diesel): ").lower()
# #         fared = fuel(source,destination,fuel_type)
# #         fare = f"{fared:.2f}"
# #         print('fuel price:',fare)

# #     elif mode == "bus" or "train":
# #         fare = get_fare(mode, source,destination)
# #         print('fare:',fare)

# #     accommodation_cost = get_accommodation_cost(destination)
# #     print('accommodation cost:',accommodation_cost)

# #     accommodation_cost = float(accommodation_cost)
# #     fare = float(fare)
# #     total_expense = fare + accommodation_cost
# #     print(f'total expense:{total_expense:.2f} INR')
# #     return total_expense
#     if mode == "flight":
#         if not departure_date:
#             raise ValueError("Departure date is required for flight mode.")
#         dep_iata = get_iata_code(source, access_token)
#         arrival_iata = get_iata_code(destination, access_token)
#         average_price, median_price, max_price, min_price = get_flight_prices(dep_iata, arrival_iata, departure_date, return_date)
#         if median_price is not None:
#             fare = median_price
#         else:
#             raise ValueError("Could not retrieve flight prices.")
#     elif mode == "car":
#         if not fuel_type:
#             raise ValueError("Fuel type is required for car mode.")
#         fare = fuel(source, destination, fuel_type)
#     elif mode in ["bus", "train"]:
#         fare = get_fare(mode, source, destination)
#     else:
#         raise ValueError("Invalid mode of transport.")

#     accommodation_cost = get_accommodation_cost(destination)
#     fare = float(fare)
#     accommodation_cost = float(accommodation_cost)
#     total_expense = fare + accommodation_cost

#     return {
#         "fare": fare,
#         "accommodation_cost": accommodation_cost,
#         "total_expense": total_expense,
#     }