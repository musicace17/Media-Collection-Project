document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
  
    // Event listener for form submission
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      console.log('Form submitted!')
  
      // Get the search query from the input field
      const query = searchInput.value.trim();
  
      // Make a request to your server with the search query
      fetch(`/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          // Clear previous search results
          searchResults.innerHTML = '';
  
          // Display search results
          data.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item.Title; // Change this to display the desired information
            searchResults.appendChild(listItem);
          });
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    });
  });
  
  console.log('script.js was loaded')