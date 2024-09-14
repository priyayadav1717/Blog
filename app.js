const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog');

const app = express();
const PORT = 3001;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define routes
app.use(blogRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
