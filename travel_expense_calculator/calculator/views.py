# from django.shortcuts import render
# from django.http import JsonResponse
# from .Backend.calc import calculate_expense

# def index(request):
#     """
#     Render the main index page with the form.
#     """
#     return render(request, 'index.html')

# def calculate(request):
#     """
#     Process the form submission, calculate expenses, and return the result as JSON.
#     """
#     if request.method == 'POST':
#         # Get common fields
#         source = request.POST.get('source')
#         destination = request.POST.get('destination')
#         mode = request.POST.get('mode')

#         # Get additional fields based on mode of transport
#         if mode == 'flight':
#             departure_date = request.POST.get('departure_date') if mode== 'flight' else None # For flights
#             return_date = request.POST.get('return_date') if mode== 'flight' else None # Optional for flights
#         elif mode == 'car':
#             fuel_type = request.POST.get('fuel_type') if mode== 'car' else None # For cars

#         # Pass dynamic fields to the calculation function
#         try:
#             result = calculate_expense(
#                 source=source,
#                 destination=destination,
#                 mode=mode,
#                 departure_date=departure_date,
#                 return_date=return_date,
#                 fuel_type=fuel_type
#             )
#             # Return the result as a JSON response
#             return JsonResponse({"success": True, "result": result})
#         except Exception as e:
#             # Handle exceptions gracefully
#             return JsonResponse({"success": False, "error": str(e)})
#     else:
#         # If the request method is not POST
#         return JsonResponse({"success": False, "error": "Invalid request method."})


from django.shortcuts import render
from django.http import JsonResponse
from .Backend.calc import calculate_expense

def index(request):
    """
    Render the main index page with the form.
    """
    return render(request, 'index.html')

def calculate(request):
    """
    Process the form submission, calculate expenses, and return the result as JSON.
    """
    if request.method == 'POST':
        try:
            source = request.POST.get('source')
            destination = request.POST.get('destination')
            mode = request.POST.get('mode')

            departure_date = request.POST.get('departure_date') if mode == 'flight' else None
            return_date = request.POST.get('return_date') if mode == 'flight' else None
            fuel_type = request.POST.get('fuel_type') if mode == 'car' else None
            bus_type = request.POST.get('bus_type') if mode == 'bus' else None
            train_class = request.POST.get('train_class') if mode == 'train' else None
            accommodation_type = request.POST.get('accommodation')

            print(mode, source, destination, departure_date, return_date, fuel_type, bus_type, train_class)

            result = calculate_expense(
                source=source,
                destination=destination,
                mode=mode,
                departure_date=departure_date,
                return_date=return_date,
                fuel_type=fuel_type,
                bus_type=bus_type,
                train_class=train_class,
                accommodation_type=accommodation_type,
            )

            return JsonResponse({"success": True, "result": result})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)})
    else:
        return JsonResponse({"success": False, "error": "Invalid request method."})
