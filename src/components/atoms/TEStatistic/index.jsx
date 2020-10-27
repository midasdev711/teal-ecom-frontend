import React from "react";
import styled from "styled-components";

const TEStatistic = (props) => {
  const { percent, title, description } = props;

  return (
    <StatisticStyle {...props}>
      <Precent>{percent}</Precent>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </StatisticStyle>
  );
};

const StatisticStyle = styled.div`
  width: 100%;
`;
const Precent = styled.div`
  min-height: 25px;
`;

const Description = styled.h3`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  color: #404950;
  margin: 0;
`;

const Title = styled.h1`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 34px;
  color: #404950;
  margin: 10px 0;
`;

export default TEStatistic;
