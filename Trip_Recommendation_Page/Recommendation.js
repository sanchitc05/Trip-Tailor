document.getElementById('travel-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Get form data
  const currentLocation = document.getElementById('current-location').value;
  const budget = document.getElementById('budget').value;
  const days = document.getElementById('days').value;
  const preferences = document.getElementById('preferences').value;

  try {
    // Make request to the backend
    const response = await fetch('http://localhost:5000/api/recommend', { // Change this URL if deploying
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentLocation, budget, days, preferences }),
    });

    // Handle response
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);

      const recommendationText = data.recommendation || 'No recommendations available';
      document.getElementById('recommendation-result').innerHTML = `
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
      document.getElementById('recommendation-text').textContent = 'Sorry, we could not fetch recommendations at this time.';
    }
    
    // Scroll to the result section
    document.getElementById('recommendation-result').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  } catch (error) {
    console.log('Error:', error);
    document.getElementById('recommendation-text').textContent = 'An error occurred while fetching recommendations.';
  }
});
