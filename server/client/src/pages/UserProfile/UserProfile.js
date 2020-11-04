import React, { useState } from "react";
import styled from "styled-components";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import Post from "../../components/Post/Post";

import Drone from "../../img/Drone.png";
import UserHeader from "./UserHeader";
import { connect } from "react-redux";

const Spacing = styled.div`
  padding: 15px;
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: ${(p) => (p.marginTop ? p.theme.spacing[p.marginTop] : 0)};
  width: 100%;
  max-width: ${(p) => p.maxWidth && p.theme.screen[p.maxWidth]};
  padding: ${(p) =>
    p.padding ? `0 ${p.theme.spacing[p.padding]}` : `0 ${p.theme.spacing.sm}`};
  z-index: ${(p) => p.zIndex && p.theme.zIndex[p.zIndex]};
  background-color: inherit;
  border-radius: ${(p) => p.radius && p.theme.radius[p.radius]};

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

const UserProfile = (props) => {
  const user = firebase.auth().currentUser;

  return (
    <Container maxWidth="sm">
      <Spacing />
      <UserHeader user={props.auth.email} followers={32} following={43} posts={1}/>
      <Spacing />
      <Post
        backgroundImage={Drone}
        postUser={props.auth.email}
        postTitle={"Printable Drone"}
        postDescription={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium a velit at vitae potenti consequat. Nec leo, gravida viverra augue ut tincidunt rutrum odio diam."
        }
        timestamp={12}
      />
    </Container>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}


export default connect(mapStatetoProps)(UserProfile);

