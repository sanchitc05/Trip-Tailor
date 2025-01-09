# Travel Expense Calculator Backend

This project is the backend for a travel expense calculator. It is designed to calculate the total travel expenses by integrating various APIs and modules for real-time data. The backend is modular, allowing for flexible calculations of different cost components like transportation, accommodation, and fuel.

## **Project Structure**

### **1. Main File: `calc.py`**
This is the main entry point of the backend. It:
- Integrates calculations from all other modules.
- Executes the entire travel expense calculation process.
- Handles user inputs and provides the final output.

### **2. Module Files**

#### **`flightfare.py`**
- Fetches real-time flight ticket costs using the **Amadeus API**.
- Calculates airfare based on the source and destination cities provided.

#### **`fuel.py`**
- Calculates the driving distance between cities using the **HERE API**.
- Determines the amount of fuel needed for the journey.
- Estimates the total fuel cost based on current fuel prices.

#### **`tickets.py`**
- Fetches real-time ticket prices for buses and trains using the **Gemini API**.
- Calculates travel costs for these transportation modes based on user inputs.

#### **`hotels.py`**
- Provides estimates for general accommodation costs in the destination city.
- Fetches real-time hotel pricing data using the **Gemini API**.

## **Setup Instructions**

### **Prerequisites**
- Python 3.8+
- Required Python libraries (install via `requirements.txt`)
- API keys for Amadeus, Gemini, and HERE APIs

### **Installation Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/travel-expense-calculator.git
   cd travel-expense-calculator
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables for API keys:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     FLIGHTAPIKEY=your_amadeus_api_key
     FLIGHTACCESSTOK=your_amadeus_access_token
     FLIGHTSEC = your_amadeus_secret
     GEMINIAPIKEY=your_gemini_api_key
     HEREMAPSKEY=your_here_api_key
     HEREAPPID=your_here_app_id
     ```

### **How to Run**
1. Run the main script to execute the travel expense calculator:
   ```bash
   python calc.py
   ```
2. Follow the prompts to input:
   - Source city
   - Destination city
   - Mode of transport (flight, bus, train, or car)
   - Additional preferences (e.g., accommodation details).

## **Modules Overview**

### **`calc.py`**
- Entry point for executing the travel expense calculator.
- Collects user inputs and aggregates results from other modules.

### **`flightfare.py`**
- Fetches real-time airfare costs via Amadeus API.
- Handles authentication and API calls for reliable data retrieval.

### **`fuel.py`**
- Uses the **HERE API** to calculate driving distances.
- Computes fuel requirements and costs based on car efficiency and fuel prices.

### **`tickets.py`**
- Fetches bus and train ticket costs from Gemini API.
- Ensures real-time ticket price updates.

### **`hotels.py`**
- Estimates accommodation costs for the destination.
- Fetches hotel pricing data for accurate results.

## **Key Features**
- **Modular Design**: Each cost component has a dedicated module.
- **Real-Time Data**: Uses APIs for real-time pricing of flights, fuel, and accommodations.
- **Scalable**: Easily extendable to include additional cost factors.

## **Future Enhancements**
- Add support for more APIs for comprehensive cost estimation.
- Include meal and miscellaneous expenses.
- Enhance error handling and user experience.

---

Developed with ❤️ by [Siddhant Sathe].

