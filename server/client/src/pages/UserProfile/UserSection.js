import React from "react";
import styled from "styled-components";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px;

  @media(max-width: 1200px){
    flex-direction: row;
  }
`;
const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  @media(max-width: 1200px){
    display: none
    }
`;

const UserTitle = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 300;
  font-size: 12px;
  color: #ffffff;
  padding-bottom: 5px;
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 18.888px;
  color: #ffffff;
`;


const UserSection = (props) => {
  return (
    <UserWrapper>
        <Avatar image={defaultPic} size={110} />
      <UserNameWrapper>
        <UserTitle>Creator:</UserTitle>
        <UserName>{props.postUser}</UserName>
      </UserNameWrapper>
    </UserWrapper>
  );
};

export default UserSection;
