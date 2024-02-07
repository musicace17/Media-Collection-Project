const express = require('express');
const cors = require('cors');
const sheetData = require('../app');

const app = express();
const PORT = 4200;

// Serve static files
app.use(express.static('client'));
// Serve cors to fix any port mismatches
app.use(cors());


// Define a route for handling search requests
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase().trim(); // Extract and normalize the search query
    
    // Filter the sheetData array based on the search query
    const searchResults = sheetData.filter(item => {
      // Perform case-insensitive search on the 'Title' key of each item
      return item.Title.toLowerCase().includes(query);
    });
    
    // Send the search results as JSON
    res.json(searchResults);
  });  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
