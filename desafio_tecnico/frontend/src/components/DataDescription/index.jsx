import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    gap: 1rem;
    color: #394B50;

    p {
        line-height: 1.5;
        width: 95%;
    }

    @media (min-width:1024px){
        p {
            width: 80%;
        }
    }

`

const DataDescription = () => {
    return (
        <Container>
            <h2>Data</h2>
            <p>Welcome to the Participant Dashboard! Here, you can view and manage the data of all participants. Each participant"s percentage contribution is clearly displayed, making it easy to understand the overall distribution. Use the form above to add new participants and ensure the total percentage does not exceed 100%. The table below provides a detailed overview of each participant, while the pie chart visually represents their contributions.</p>
        </Container>
    )
}

export default DataDescription;