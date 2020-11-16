import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items:center;
`;
const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;

`;

const UserTitle = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;

    @media (max-width: 500px) {
    font-size: 20px;
  }
`;

const UserSection = (props) => {
  return (
    <UserWrapper>
      <Avatar image={defaultPic} size={60} />{" "}
      <UserNameWrapper>
        <UserTitle>Creator:</UserTitle>
        <UserName>{props.postAuthor.username}</UserName>
      </UserNameWrapper>
    </UserWrapper>
  );
};

export default UserSection;
