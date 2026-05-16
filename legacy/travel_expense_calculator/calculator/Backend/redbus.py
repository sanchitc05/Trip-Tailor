from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# Set your OpenAI API key
# openai.api_key = os.getenv('CHATGPTAPIKEY')
client = OpenAI(api_key = os.getenv('CHATGPTAPIKEY'))

# def get_estimated_fare(source, destination, mode_of_transport):
#     """Fetch estimated fare from ChatGPT based on user inputs."""
#     prompt = (
#         f"Estimate the fare for traveling by {mode_of_transport.lower()} "
#         f"from {source} to {destination}. Provide a rough estimate in Indian Rupees."
#     )
    
#     # Use the ChatGPT API to get the response
#     response = openai.ChatCompletion.create(
#         model="gpt-3.5-turbo",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant for estimating travel fares."},
#             {"role": "user", "content": prompt}
#         ]
#     )
    
#     # Extract the content from the response
#     fare_estimate = response['choices'][0]['message']['content']
#     return fare_estimate

# def main():
#     print("Welcome to the Travel Fare Estimator!")
    
#     # Take user input
#     source = input("Enter the source city: ")
#     destination = input("Enter the destination city: ")
#     mode_of_transport = input("Enter the mode of transport (Bus/Train): ")
    
#     # Validate mode of transport
#     if mode_of_transport.lower() not in ["bus", "train"]:
#         print("Invalid mode of transport. Please enter 'Bus' or 'Train'.")
#         return
    
#     # Get estimated fare
#     fare_estimate = get_estimated_fare(source, destination, mode_of_transport)
    
#     # Display the result
#     print("\n--- Fare Estimate ---")
#     print(f"From: {source}")
#     print(f"To: {destination}")
#     print(f"Mode of Transport: {mode_of_transport}")
#     print(f"Estimated Fare: {fare_estimate}")

# if __name__ == "__main__":
#     main()

def get_estimated_fare(source, destination, mode_of_transport):
    """Fetch estimated fare from ChatGPT based on user inputs."""
    prompt = (
        f"Estimate the fare for traveling by {mode_of_transport.lower()} "
        f"from {source} to {destination}. Provide a rough estimate in Indian Rupees."
    )
    
    # Use the updated ChatGPT API to get the response
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",  # Replace "gpt-4" with "gpt-3.5-turbo" if you prefer
        messages=[
            {"role": "system", "content": "You are a helpful assistant for estimating travel fares."},
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract the content from the response
    fare_estimate = response.choices[0].message.content
    return fare_estimate

def main():
    print("Welcome to the Travel Fare Estimator!")
    
    # Take user input
    # source = input("Enter the source city: ")
    # destination = input("Enter the destination city: ")
    # mode_of_transport = input("Enter the mode of transport (Bus/Train): ")
    source = "Mumbai"
    destination = "Pune"
    mode_of_transport = "Train"
    
    # Validate mode of transport
    if mode_of_transport.lower() not in ["bus", "train"]:
        print("Invalid mode of transport. Please enter 'Bus' or 'Train'.")
        return
    
    # Get estimated fare
    fare_estimate = get_estimated_fare(source, destination, mode_of_transport)
    
    # Display the result
    print("\n--- Fare Estimate ---")
    print(f"From: {source}")
    print(f"To: {destination}")
    print(f"Mode of Transport: {mode_of_transport}")
    print(f"Estimated Fare: {fare_estimate}")

if __name__ == "__main__":
    main()
