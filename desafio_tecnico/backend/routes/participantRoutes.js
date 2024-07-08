const express = require("express"); // Import the Express framework
const {
  getParticipants,
  getParticipant,
  addParticipant,
  updateParticipantDetails,
  removeParticipant
} = require("../controllers/participantController"); // Import participant controller functions

const router = express.Router(); // Create a new router instance

// Define routes for participant CRUD operations
router.get("/participants", getParticipants); // GET all participants
router.get("/participants/:id_participant", getParticipant); // GET a specific participant by ID
router.post("/participants", addParticipant); // POST a new participant
router.put("/participants/:id_participant", updateParticipantDetails); // PUT (update) a specific participant by ID
router.delete("/participants/:id_participant", removeParticipant); // DELETE a specific participant by ID

module.exports = router; // Export the router to be used in the main app
 