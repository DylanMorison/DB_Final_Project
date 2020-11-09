import React, { useState } from "react";
import styled from "styled-components";
import UserSection from "./UserSection.js";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: rgba(191, 191, 191, 0.23);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(36px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 12px;
  height: 175px;
  width: 50vw;
  padding: 15x;

  @media (max-width: 1007px) {
    width: 80vw;
  }
`;

const Line = styled.div`
  border-left: 4px solid white;
  height: 70%;

  @media (max-width: 500px) {
    display: none;
  }
`;

const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserStat = styled.div`
  font-family: aktiv-grotesk;
  font-size: 18.888px;
  color: white;
  padding-bottom: 5px;
`;

const Number = styled.div`
  font-family: aktiv-grotesk;
  font-size: 18.888px;
  color: white;
`;

const UserSectionWrapper = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;
const UserHeader = (props) => {
  return (
    <HeaderWrapper>
      <UserSectionWrapper>
        <UserSection userData={props.userData} />
      </UserSectionWrapper>
      <Line />
      <StatsWrapper>
        <UserStat>Posts</UserStat> <Number>{props.posts}</Number>
      </StatsWrapper>
      <StatsWrapper>
        <UserStat>Following</UserStat> <Number>{props.following}</Number>
      </StatsWrapper>
      <StatsWrapper>
        <UserStat>Followers</UserStat> <Number>{props.followers}</Number>
      </StatsWrapper>
    </HeaderWrapper>
  );
};

export default UserHeader;
//user={user.email} friends={32} following={43} posts={1}
