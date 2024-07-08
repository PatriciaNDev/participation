import styled from "styled-components";
import GlobalStyles from "./components/Globalstyles";
import Header from "./components/Header";
import ParticipantsDashboard from "./components/ParticipantsDashboard";
import DataDescription from "./components/DataDescription";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

function App() {

  return (
    <>
      <GlobalStyles />
      <Header/>
      <StyledMain>
        <DataDescription/>
        <ParticipantsDashboard/>
      </StyledMain>
      
    </>
  )
}

export default App;
