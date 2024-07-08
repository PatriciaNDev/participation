import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  width: 80%;
  flex-wrap: wrap;

  @media (min-width: 1024px){
    width: 50%;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${props => props.color};
`;

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${props => props.color};
  margin-right: 0.5rem;
  border-radius: 2px;
`;

const generateColor = (index) => {
  const color = (index * 137.508) % 360;
  return `hsl(${color}, 70%, 50%)`;
};

const ParticipantChart = ({ participants, remaining }) => {
  const COLORS = participants.map((participant, index) => generateColor(index));
  COLORS.push("#E0E0E0");

  const data = participants.map(participant => ({
    name: `${participant.first_name} ${participant.last_name}`,
    value: participant.percentage
  }));

  if (remaining > 0) {
    data.push({ name: "Remaining", value: remaining });
  }

  return (
    <ChartContainer>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={"50%"}
          cy={"50%"}
          labelLine={false}
          outerRadius={100}
          innerRadius={50}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <LegendContainer>
        {data.map((entry, index) => (
          <LegendItem key={`legend-${index}`} color={COLORS[index % COLORS.length]}>
            <ColorBox color={COLORS[index % COLORS.length]} />
            <span>{entry.name}</span>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartContainer>
  );
};

export default ParticipantChart;
