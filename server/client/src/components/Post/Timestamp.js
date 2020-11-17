import React from "react";
import DownloadIcon from "../icons/DownloadIcon";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: aktiv-grotesk;
  color: #ffffff;
  font-weight: 300;
  font-size: 16px;
  
  @media (max-width: 1000px) {
    display: none;
  }

  
`;
const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: aktiv-grotesk;
  font-weight: 300;
  font-size: 18px;
  color: #ffffff;
  padding-right: 20px;
`;

const Timestamp = (props) => {
  return (
    <Wrapper>
      <TimeWrapper>{props.timestamp}</TimeWrapper>
      <a href={`${props.postData.file}`} target="_blank" download><DownloadIcon /></a>
    </Wrapper>
  );
};

export default Timestamp;
