# import requests
# from dotenv import load_dotenv
# import os

# load_dotenv()
# # Amadeus API credentials (replace these with your actual credentials)
# API_KEY = os.getenv('FLIGHTAPIKEY')
# API_SECRET = os.getenv('FLIGHTSEC')
# access_token = os.getenv('FLIGHTACCESSTOK')

# # Authenticate and get an access token
# # def authenticate():
# #     url = "https://test.api.amadeus.com/v1/security/oauth2/token"
# #     params = {
# #         'grant_type': 'client_credentials',
# #         'client_id': API_KEY,
# #         'client_secret': API_SECRET,
# #     }
    
# #     response = requests.post(url, data=params)
# #     if response.status_code == 200:
# #         access_token = response.json().get('access_token')
# #         return access_token
# #     else:
# #         print("Error authenticating:", response.text)
# #         return None

# def get_city_code(city_name, access_token):
#     url = f"https://test.api.amadeus.com/v1/reference-data/locations/cities"
#     params = {'keyword': city_name}
#     headers = {'Authorization': f'Bearer {access_token}'}
    
#     response = requests.get(url, headers=headers, params=params)
    
#     if response.status_code == 200:
#         city_data = response.json()
#         if city_data['data']:
#             city_code = city_data['data'][0]['id']
#             return city_code
#         else:
#             print(f"City '{city_name}' not found.")
#             return None
#     else:
#         print("Error fetching city code:", response.text)
#         return None

# def get_hotel_prices(city_code, checkin_date, checkout_date, access_token):
#     url = "https://test.api.amadeus.com/v2/shopping/hotel-offers"
#     params = {
#         'cityCode': city_code,
#         'checkInDate': checkin_date,
#         'checkOutDate': checkout_date,
#         'adults': 1,  # Number of adults
#     }
    
#     headers = {'Authorization': f'Bearer {access_token}'}
#     response = requests.get(url, headers=headers, params=params)
    
#     if response.status_code == 200:
#         hotel_data = response.json()
#         return hotel_data
#     else:
#         print("Error fetching hotel data:", response.text)
#         return None

# def get_user_input():
#     print("Enter destination city (e.g., Paris, New York):")
#     city = input().strip()
    
#     print("Enter check-in date (YYYY-MM-DD):")
#     checkin_date = input().strip()
    
#     print("Enter check-out date (YYYY-MM-DD):")
#     checkout_date = input().strip()
    
#     return city, checkin_date, checkout_date

# def display_hotels(hotel_data):
#     if hotel_data and 'data' in hotel_data:
#         print("\nAvailable Hotels:")
#         for hotel in hotel_data['data']:
#             name = hotel['hotel']['name']
#             price = hotel['offers'][0]['price']['total']
#             currency = hotel['offers'][0]['price']['currency']
#             print(f"Hotel: {name}, Price: {price} {currency}")
#     else:
#         print("No hotels found or error occurred.")

# def main():
#     city_name, checkin_date, checkout_date = get_user_input()
    
#     # Authenticate to get access token
#     access_token = os.getenv('FLIGHTACCESSTOK')
    
#     if access_token:
#         city_code = get_city_code(city_name, access_token)
#         if city_code:
#             hotel_data = get_hotel_prices(city_code, checkin_date, checkout_date, access_token)
#             display_hotels(hotel_data)
#         else:
#             print(f"Unable to find the city code for '{city_name}'.")
#     else:
#         print("Unable to authenticate. Please check your credentials.")

# if __name__ == "__main__":
#     main()



import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINIAPIKEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)
# mode = "train"
# source = "Mumbai"
# destination = "Delhi"

valid_modes = ["budget", "midrange", "luxury"]

mode = input("Enter type of accommodation(budget/midrange.luxury): ").lower()

while mode not in valid_modes:
    print("Invalid mode of transport. Please enter 'budget', 'midrange', 'luxury'.")
    mode = input("Enter mode of transport (Bus/Train): ").lower()

destination = input("Enter destination: ")

response = chat_session.send_message(f"whats the general cost of accommodation in {destination} for {mode} type? return just the number")

accommodation_cost = response.text

print(accommodation_cost, type(accommodation_cost))
