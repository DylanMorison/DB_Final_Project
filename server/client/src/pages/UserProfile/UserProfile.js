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
import { useSelector } from "react-redux";

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
  const { auth } = props.location.state; // pulls out the auth from the state passed by <Link/> in react router
  const thisUser = useSelector(state => state.users.usersByUid[auth])
  const thisUserPosts = useSelector(state => state.posts.postsByUids, postsByUids => postsByUids.filter(post => post.authorUid == auth))
  let userPostLength = Object.keys(thisUserPosts).length;
  let Posts = [];
  for (const post in thisUserPosts) {
      Posts.push(post)
  }

  console.log(Posts)


  return (
    <Container maxWidth="sm">
      <Spacing />
      <UserHeader
        user={thisUser.email}
        userData={thisUser}
        followers={thisUser.followers}
        following={thisUser.following}
        posts={1}
      />
      <Spacing />
      {12 > 0 ? (
        Posts.map((postUid) => (
          <Post
          postUid={postUid}
          />
        ))
      ) : (
        <div> no posts by this user </div>
      )}
    </Container>
  );
};

function mapStatetoProps(state) {
  return {
    posts: state.posts,
    users: state.users,
  };
}

export default connect(mapStatetoProps)(UserProfile);

