const {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipantPercentage,
  deleteParticipant
} = require("../models/participant"); // Import participant model functions

// Controller to get all participants and calculate remaining participation
const getParticipants = async (req, res) => {
  try {
    const participants = await getAllParticipants();
    const totalParticipation = participants.reduce((sum, participant) => sum + participant.percentage, 0);
    const remainingParticipation = 100 - totalParticipation;

    const response = {
      participants,
      remaining: remainingParticipation > 0 ? remainingParticipation : 0
    };

    res.json(response); // Respond with participants and remaining participation
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch participants" }); // Handle errors
  }
};

// Controller to get a participant by ID
const getParticipant = async (req, res) => {
  try {
    const { id_participant } = req.params;
    const participant = await getParticipantById(id_participant);
    if (participant) {
      res.json(participant); // Respond with the participant if found
    } else {
      res.status(404).json({ error: "Participant not found" }); // Respond with 404 if not found
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch participant" }); // Handle errors
  }
};

// Controller to add a new participant
const addParticipant = async (req, res) => {
  try {
    const { first_name, last_name, percentage } = req.body;

    const participants = await getAllParticipants();
    const totalParticipation = participants.reduce((sum, participant) => sum + participant.percentage, 0);

    const duplicateParticipant = participants.find(participant =>
      participant.first_name.toLowerCase() === first_name.toLowerCase() &&
      participant.last_name.toLowerCase() === last_name.toLowerCase()
    );

    if (duplicateParticipant) {
      return res.status(400).json({
        error: "A participant with the same first name and last name already exists."
      });
    }

    if (totalParticipation + percentage > 100) {
      const maxParticipation = 100 - totalParticipation;
      return res.status(400).json({
        error: `Total participation cannot exceed 100%. Maximum allowed participation for new participant is ${maxParticipation}%.`
      });
    }

    const participant = await createParticipant(first_name, last_name, percentage);
    res.status(201).json(participant); // Respond with the created participant
  } catch (error) {
    res.status(500).json({ error: "Failed to create participant" }); // Handle errors
  }
};

// Controller to update participant details
const updateParticipantDetails = async (req, res) => {
  try {
    const { id_participant } = req.params;
    const { percentage } = req.body;
    const participants = await getAllParticipants();
    const participantToUpdate = participants.find(p => p.id_participant === parseInt(id_participant));

    if (!participantToUpdate) {
      return res.status(404).json({ error: "Participant not found" });
    }

    const updatedParticipation = parseFloat(percentage);

    const totalParticipation = participants.reduce((sum, participant) => sum + (participant.id_participant !== parseInt(id_participant) ? participant.percentage : 0), 0);

    const maxParticipation = 100 - totalParticipation;

    if (updatedParticipation > maxParticipation) {
      return res.status(400).json({
        error: `Total participation cannot exceed 100%. Maximum allowed participation for updated participant is ${maxParticipation}%.`
      });
    }

    const updatedParticipant = await updateParticipantPercentage(id_participant, updatedParticipation);
    res.json(updatedParticipant); // Respond with the updated participant
  } catch (error) {
    res.status(500).json({ error: "Failed to update participant" }); // Handle errors
  }
};

// Controller to remove a participant
const removeParticipant = async (req, res) => {
  try {
    const { id_participant } = req.params;
    const message = await deleteParticipant(id_participant);
    res.status(200).json(message); // Respond with a success message
  } catch (error) {
    if (error.message === "Participant not found") {
      res.status(404).json({ error: "Participant not found" }); // Respond with 404 if not found
    } else {
      res.status(500).json({ error: "Failed to delete participant" }); // Handle errors
    }
  }
};

module.exports = {
  getParticipants,
  getParticipant,
  addParticipant,
  updateParticipantDetails,
  removeParticipant
};
