// Import express
import express from "express";

// Create an express application
const app = express();

// Define a port
const port = process.env.PORT || 8080;

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
