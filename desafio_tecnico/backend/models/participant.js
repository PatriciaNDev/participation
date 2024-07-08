const db = require("../config/database"); // Import the database configuration

// Create a new participant
const createParticipant = async (first_name, last_name, percentage) => {
  const [result] = await db.query("INSERT INTO tb_participant (first_name, last_name, percentage) VALUES (?, ?, ?)", [first_name, last_name, percentage]);
  return { id_participant: result.insertId, first_name, last_name, percentage }; // Return the created participant
};

// Get all participants
const getAllParticipants = async () => {
  const [rows] = await db.query("SELECT * FROM tb_participant");
  return rows; // Return all participants
};

// Get a participant by ID
const getParticipantById = async (id_participant) => {
  const [rows] = await db.query("SELECT * FROM tb_participant WHERE id_participant = ?", [id_participant]);
  return rows[0]; // Return the participant with the given ID
};

// Update a participant"s percentage
const updateParticipantPercentage = async (id_participant, percentage) => {
  await db.query("UPDATE tb_participant SET percentage = ? WHERE id_participant = ?", [percentage, id_participant]);
  const [updatedRow] = await db.query("SELECT * FROM tb_participant WHERE id_participant = ?", [id_participant]);
  return updatedRow[0]; // Return the updated participant
};

// Delete a participant by ID
const deleteParticipant = async (id_participant) => {
  const [result] = await db.query("DELETE FROM tb_participant WHERE id_participant = ?", [id_participant]);
  return result; // Return the result of the deletion
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipantPercentage,
  deleteParticipant
};
