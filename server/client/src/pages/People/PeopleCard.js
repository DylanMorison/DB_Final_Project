import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { generatePath } from "react-router-dom";

import { A } from "components/Text";
import { Spacing } from "components/Layout";
import theme from "theme";

import * as Routes from "routes";
import Avatar from "../../components/Avatar";
import AddButton from "./AddButton"

const Root = styled.div`
  width: 312px;
  height: 480px;
  background: #404040;
  border-radius: 8.64545px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
`;

const UserName = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;
  padding-top: 15px;
  padding-bottom: 35px;
  text-align: center;

`;

const UserBio = styled.div`
  font-size: 15.2px;
  font-weight: normal;
  font-family: proxima-nova;
  color: #ffffff;
  text-align: center;
  padding-bottom: 35px;
`;


const PeopleCard = (props) => {
  const [following, setFollowing] = useState(false);

  const handleFollowing = ( ) => {
    setFollowing(!following);
    
  }
  
  return (
    <Root>
      <Avatar size={70} />
      <UserName>{props.username}</UserName>
      <UserBio>{props.bio}</UserBio>
      <AddButton handleFollowing={handleFollowing} following={following} />
    </Root>
  );
};

export default PeopleCard;
