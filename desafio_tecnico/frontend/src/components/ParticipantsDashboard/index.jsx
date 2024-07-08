import React, { useEffect, useState } from "react";
import axios from "axios";
import ParticipantTable from "../ParticipantTable";
import ParticipantChart from "../ParticipantChart";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const ParticipantsDashboard = () => {
  const [participants, setParticipants] = useState([]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get("/api/participants");
      setParticipants(response.data.participants);
      setRemaining(response.data.remaining);
    } catch (error) {
      throw error;
    }
  };

  const handleParticipantUpdate = async (id_participant, newData) => {
    try {
      await axios.put(`/api/participants/${id_participant}`, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchParticipants();
    } catch (error) {
      throw error;
    }
  };

  const handleParticipantDelete = async (id_participant) => {
    try {
      await axios.delete(`/api/participants/${id_participant}`);
      fetchParticipants();
    } catch (error) {
      throw error;
    }
  };

  return (
    <DashboardContainer>
      <ParticipantTable
        participants={participants}
        onUpdate={handleParticipantUpdate}
        onDelete={handleParticipantDelete}
      />
      <ParticipantChart participants={participants} remaining={remaining} />
    </DashboardContainer>
  );
};

export default ParticipantsDashboard;
