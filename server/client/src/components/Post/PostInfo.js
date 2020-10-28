import React from "react";
import styled from "styled-components";

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;

  @media (max-width: 1000px) {
    display: none;
  }
`;

const PostDescription = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: #ffffff;
  font-family: Proxima Nova;
  width: 45%;
  height: 100%;

  @media (max-width: 1500px) {
    display: none;
  }
`;

const PostTitle = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;
  padding-top: 15px;
  text-align: center

  @media (max-width: 1300px) {
    padding-top: 0px;
  }
`;

const PostInfo = (props) => {
  return (
    <InfoWrapper>
      <PostTitle>{props.postTitle}</PostTitle>
      <PostDescription>{props.postDescription}</PostDescription>
    </InfoWrapper>
  );
};

export default PostInfo;
