const express = require("express"); // Import the Express framework
const bodyParser = require("body-parser"); // Import the body-parser middleware to parse JSON request bodies
const cors = require("cors"); // Import CORS middleware to allow cross-origin requests
const participantRoutes = require("./routes/participantRoutes"); // Import participant routes

const app = express(); // Create an Express application instance

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use("/api", participantRoutes); // Use participant routes for the "/api" endpoint

const PORT = process.env.PORT || 5001; // Define the port for the server to listen on
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Log the server startup message
});
