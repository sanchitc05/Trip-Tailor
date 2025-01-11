# import os
# import google.generativeai as genai
# from dotenv import load_dotenv

# load_dotenv()
# def get_fare(mode, source, destination):
#     genai.configure(api_key=os.environ["GEMINIAPIKEY"])

#     # Create the model
#     generation_config = {
#       "temperature": 1,
#       "top_p": 0.95,
#       "top_k": 40,
#       "max_output_tokens": 8192,
#       "response_mime_type": "text/plain",
#     }

#     model = genai.GenerativeModel(
#       model_name="gemini-2.0-flash-exp",
#       generation_config=generation_config,
#     )

#     chat_session = model.start_chat(
#       history=[
#       ]
#     )
#     # mode = "train"
#     # source = "Mumbai"
#     # destination = "Delhi"

#     valid_modes = ["bus", "train"]

#     # mode = input("Enter mode of transport (Bus/Train): ").lower()
#     mode = mode.lower()

#     while mode not in valid_modes:
#         print("Invalid mode of transport. Please enter 'Bus', 'Train'.")
#         mode = input("Enter mode of transport (Bus/Train): ").lower()

#     # mode = input("Enter mode of transport: ").lower()
#     # source = input("Enter source: ")
#     # destination = input("Enter destination: ")


#     if mode == "train":
#     #   trainclass = "Sleeper" # Sleeper, AC3, AC2, AC1, General
#         trainclass = input("Enter train class(Sleeper,AC3,AC2,AC1,General):")
#         response = chat_session.send_message(f"whats the average {mode} fare from {source} to {destination} in {trainclass}? return just the number")
#     elif mode == "bus":
#     #   bustype = 'State Transport' # state transport, private non ac, private ac
#         bustype = input("Enter bus type(state transport, private non ac, private ac):")
#         response = chat_session.send_message(f"whats the average {mode} fare from {source} to {destination} in {bustype}? return just the number")

#     cost = response.text

#     # print(cost, type(cost))
#     return cost


import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def get_fare(mode, source, destination, train_class=None, bus_type=None):
    """
    Get fare for the specified mode of transport using Google Generative AI.
    :param mode: Mode of transport (bus or train).
    :param source: Source city.
    :param destination: Destination city.
    :param trainclass: Class of train travel (e.g., Sleeper, AC3, AC2, etc.).
    :param bustype: Type of bus travel (e.g., State Transport, Private Non-AC, etc.).
    :return: Average fare as a float.
    """
    genai.configure(api_key=os.environ["GEMINIAPIKEY"])

    # Configure generation settings
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

    chat_session = model.start_chat(history=[])

    # Validate mode
    valid_modes = ["bus", "train"]
    mode = mode.lower()
    if mode not in valid_modes:
        raise ValueError(f"Invalid mode of transport. Valid modes are: {valid_modes}")

    # Construct query
    if mode == "train":
        if not train_class:
            raise ValueError("Train class is required for train mode.")
        query = f"What's the average {mode} fare from {source} to {destination} in {train_class}? Return just the number."
    elif mode == "bus":
        if not bus_type:
            raise ValueError("Bus type is required for bus mode.")
        query = f"What's the average {mode} fare from {source} to {destination} in {bus_type}? Return just the number."

    # Send query to the AI model
    response = chat_session.send_message(query)
    cost = response.text.strip()

    # Attempt to parse the cost as a float
    try:
        cost = float(cost)
    except ValueError:
        raise ValueError(f"Failed to retrieve a valid fare. Response: {cost}")

    return cost
