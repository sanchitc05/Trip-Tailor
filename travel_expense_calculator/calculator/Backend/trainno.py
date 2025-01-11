import requests
from dotenv import load_dotenv
import os
import time
import pandas as pd

load_dotenv()

APIKEY = os.getenv('RAILAPIKEY')

From = 'KYN'
To = 'PUN'
api_url = f'http://indianrailapi.com/api/v2/TrainBetweenStation/apikey/{APIKEY}/From/{From}/To/{To}'

max_retries = 5
retry_delay = 2  # seconds

response = requests.get(api_url)
res = response.json()
# print(type(data))
data = res['Message']
print(data[:10])

# for attempt in range(max_retries):
#     response = requests.get(api_url)
#     if response.status_code == 200:
#         print(response)
#         if response.status_code == 200:
#             try:
#                 data = response.json()
#                 if 'Trains' in data:
#                     res = data['Trains']
#                     print(res)
#                     break
#                 else:
#                     print("Key 'Trains' not found in the response.")
#                     break
#             except ValueError:
#                 print("Invalid JSON response.")
#                 break
#         else:
#             print(f"Attempt {attempt + 1} failed: {response.json()['Message']}")
#             time.sleep(retry_delay)
#     else:
#         print("All attempts failed. Please try again later.")


# df = pd.DataFrame(response.json()['Trains'])
# res = response.json()['Trains']
# print(res)



# https://rapidapi.com/collection/redbus-api