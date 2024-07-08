import React, { useState } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 2rem;

  p {
    color: #e13939;
    width: 60%;
  }
`;

const Table = styled.table`
  width: 60%;
  border-collapse: collapse;
  border: 2px solid #394B50;
`;

const TableHeader = styled.th`
  border: 1px solid #394B50;
  padding: 0.5rem;
  color: #394B50;
  background-color: #c1d9e0;
`;

const TableCell = styled.td`
  border: 1px solid #394B50;
  padding: 0.5rem;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 5px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
`;

const ParticipantTable = ({ participants, onUpdate, onDelete }) => {
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [newPercentage, setNewPercentage] = useState("");
  const [message, setMessage] = useState("");

  const handleEditClick = (participant) => {
    setEditingParticipant(participant.id_participant);
    setNewPercentage(participant.percentage);
    setMessage("");
  };

  const handleSaveClick = async (id_participant) => {
    try {
      await onUpdate(id_participant, { percentage: parseFloat(newPercentage) });
      setEditingParticipant(null);
      setNewPercentage("");
      setMessage("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Unknown error occurred.");
      } else {
        setMessage("Network error. Please check your internet connection.");
      }
    }
  };

  const handleDeleteClick = async (id_participant) => {
    try {
      await onDelete(id_participant);
      setMessage("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "Unknown error occurred.");
      } else {
        setMessage("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader></TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Participation</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={participant.id_participant}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{participant.first_name}</TableCell>
              <TableCell>{participant.last_name}</TableCell>
              <TableCell>
                {editingParticipant === participant.id_participant ? (
                  <input
                    type="number"
                    value={newPercentage}
                    onChange={(e) => setNewPercentage(e.target.value)}
                    style={{ width: "50px" }}
                  />
                ) : (
                  `${participant.percentage}%`
                )}
              </TableCell>
              <TableCell>
                {editingParticipant === participant.id_participant ? (
                  <Button onClick={() => handleSaveClick(participant.id_participant)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEditClick(participant)}>Edit</Button>
                )}
                <Button onClick={() => handleDeleteClick(participant.id_participant)}>Delete</Button>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      {message && <p>{message}</p>}
    </TableContainer>
  );
};

export default ParticipantTable;
