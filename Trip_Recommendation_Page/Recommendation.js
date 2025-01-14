API_KEY ='AIzaSyAqnedwm6RPYv0OO4Q5FBNDDCIyHWmfyJU'
document.getElementById('travel-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get form data
  const currentLocation = document.getElementById('current-location').value;
  const budget = document.getElementById('budget').value;
  const days = document.getElementById('days').value;
  const preferences = document.getElementById('preferences').value;

  const requestData = {
    contents: [{
      parts: [{
        text: `Suggest a travel destination based on the following preferences:\nLocation: ${currentLocation}\nBudget: ${budget} INR\nDays: ${days}\nPreferences: ${preferences}`
      }]
    }]
  };

  console.log('Request Data:', requestData);  // Log the data being sent to API

  try {
    // Make the request to the Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    // Handle response
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);  // Log the API response

      // Check if candidates array exists and has data
      if (data.candidates && data.candidates.length > 0) {
        // Extract the recommendation text from the response
        const recommendationText = data.candidates[0].content.parts[0].text || 'No content available';
        const recommendationResult = document.getElementById('recommendation-result');
    recommendationResult.innerHTML = `
      <div class="recommendation-card show">
        <div class="card-header">
          <i class="fas fa-map-marker-alt"></i>
          <h3>Your Travel Recommendation</h3>
        </div>
        <p id="recommendation-text">${recommendationText}</p>
        <button id="explore-btn">Explore More</button>
      </div>
    `;
      } else {
        document.getElementById('recommendation-text').textContent = 'No recommendations available at this time.';
      }
    } else {
      const errorData = await response.json();
      console.log('Error Data:', errorData);  // Log error details
      document.getElementById('recommendation-text').textContent = 'Sorry, we could not fetch recommendations at this time.';
    }
     // Scroll to the recommendation result section
     document.getElementById('recommendation-result').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } catch (error) {
    console.log('Error:', error);  // Log any network error
    document.getElementById('recommendation-text').textContent = 'An error occurred while fetching recommendations.';
   // Scroll to the recommendation result section in case of an error
   document.getElementById('recommendation-result').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  }
});

document.querySelector('.hamburger').addEventListener('click', () => {
  const navLinks = document.querySelector('.navbar-links');
  navLinks.classList.toggle('show');
});
