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

valid_modes = ["bus", "train"]

mode = input("Enter mode of transport (Bus/Train): ").lower()

while mode not in valid_modes:
    print("Invalid mode of transport. Please enter 'Bus', 'Train'.")
    mode = input("Enter mode of transport (Bus/Train): ").lower()

# mode = input("Enter mode of transport: ").lower()
source = input("Enter source: ")
destination = input("Enter destination: ")


if mode == "train":
#   trainclass = "Sleeper" # Sleeper, AC3, AC2, AC1, General
    trainclass = input("Enter train class(Sleeper,AC3,AC2,AC1,General):")
    response = chat_session.send_message(f"whats the average {mode} fare from {source} to {destination} in {trainclass}? return just the number")
elif mode == "bus":
#   bustype = 'State Transport' # state transport, private non ac, private ac
    bustype = input("Enter bus type(state transport, private non ac, private ac):")
    response = chat_session.send_message(f"whats the average {mode} fare from {source} to {destination} in {bustype}? return just the number")

cost = response.text

print(cost, type(cost))