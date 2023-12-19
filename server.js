const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3008;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/yogaD', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB connection successful");
});

// Schema definition
const enrollmentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  batchTime: String,
  
});

// Model based on the schema
const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

// API endpoint to handle form submissions
app.post('/enroll', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, age, batchTime } = req.body;

    // Basic validation
    if (!name || !age || !batchTime) {
      return res.status(400).json({ error: 'Please provide all required information.' });
    }

    // Save data to MongoDB
    const enrollment = new Enrollment({ name, age, batchTime });
    await enrollment.save();

    // Return success response
    res.json({ success: true, message: 'Enrollment successful.' });
  } catch (error) {
    console.error('Error enrolling user:', error);
    console.error(error.stack); // Log the stack trace
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle GET requests at the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is the root of the server.');
});

// Handle all other GET requests with a wildcard route
app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
