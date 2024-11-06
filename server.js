// Import required modules
const express = require('express'); // Web framework for routing and handling requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Utility for working with file and directory paths
const fs = require('fs'); // File system module for reading and writing files
const app = express(); // Initialize an Express app
const PORT = 3000; // Port the server will listen on

// Middleware configuration
// Body parser middleware to handle JSON and URL-encoded form data
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files (HTML, CSS, JS, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes configuration

// Home route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Sends the index.html file to the client
});

// Login route to serve the login.html file
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html')); // Sends the login.html file to the client
});

// Register endpoint to handle user registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body; // Extract user data from the request body
    const userData = `${name},${email},${password}\n`; // Format the user data as a CSV string
    fs.appendFileSync('users.csv', userData); // Append the user data to the "users.csv" file
    res.json({ success: true, message: 'Registration successful!' }); // Send a success response to the client
});

// Login endpoint to handle user authentication
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extract login credentials from the request body
    const users = fs.readFileSync('users.csv', 'utf8') // Read the "users.csv" file
        .split('\n') // Split file content by lines
        .map(line => line.split(',')); // Split each line into an array of user data

    // Search for a user that matches the provided email and password
    const user = users.find(user => user[1] === email && user[2] === password);
    
    // Respond based on whether the user is found or not
    if (user) {
        res.json({ success: true, message: 'Login successful!' }); // Successful login
    } else {
        res.json({ success: false, message: 'Invalid credentials' }); // Failed login
    }
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log the server start message with the port number
});
