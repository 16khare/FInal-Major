const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // To handle file paths
require('dotenv').config(); // Load environment variables
const db = require('./db'); // Database connection module
const authRoutes = require('./routes/authRoutes'); // Import authentication routes

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files from the root directory
app.use(express.static(__dirname)); // Serve all static files directly from root (including auth.js)

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve the index.html file from the root
});

// Routes
app.use('/auth', authRoutes); // Mount authentication routes

// Handle database connection errors globally
db.on('error', (err) => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit the process if the database connection fails
});

// Start the server
const PORT = process.env.APP_PORT || 3000; // Use APP_PORT from .env or default to 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
