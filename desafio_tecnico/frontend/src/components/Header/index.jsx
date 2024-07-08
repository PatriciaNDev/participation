import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #048290;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    input {
      color: #394B50;
      background-color: #fff;
      padding: 0.4rem;
    }

    button {
      color: #fff;
      border: 2px solid #fff;
      padding: 0.3rem;
    }
  }
  p {
      color: #394B50;
    }
  
  @media (min-width: 768px){
    form {
      flex-direction: row;
    }
  }
`;

function Header() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [percentage, setPercentage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/participants", {
        first_name: firstName,
        last_name: lastName,
        percentage: parseFloat(percentage)
      });
  
      setFirstName("");
      setLastName("");
      setPercentage("");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data.error || error.message);
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
        }
      } else {
        setMessage("Network error. Please check your internet connection.");
      }
    }
  };
  
  return (
    <StyledHeader>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="number"
          name="percentage"
          id="percentage"
          placeholder="Participation"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
       {message && <p>{message}</p>}
    </StyledHeader>
  );
}

export default Header;
