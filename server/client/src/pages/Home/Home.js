import React, { useState } from "react";
import styled from "styled-components";
import { generatePath } from "react-router-dom";

import { A } from "components/Text";

import { Loading } from "components/Loading";
import InfiniteScroll from "components/InfiniteScroll";
import Skeleton from "components/Skeleton";
import Head from "components/Head";

import { useStore } from "store";

import { HOME_PAGE_POSTS_LIMIT } from "constants/DataLimit";

import * as Routes from "routes";

import Post from "../../components/Post/Post";

import Drone from "../../img/Drone.png";
import { connect } from "react-redux";
import { userAddPost } from "../../actions";
import { useSelector } from "react-redux";

const Empty = styled.div`
  padding: ${(p) => p.theme.spacing.sm};
  border: 1px solid ${(p) => p.theme.colors.border.main};
  border-radius: ${(p) => p.theme.radius.sm};
  margin-top: ${(p) => p.theme.spacing.lg};
  background-color: ${(p) => p.theme.colors.white};
`;

const StyledA = styled(A)`
  text-decoration: underline;
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

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
/**
 * Home page of the app
 */
const Home = (props) => {
  return (
    //create function to fetch posts here 
    <Container maxWidth="sm">
      <Spacing />
      {props.homePosts.allPostUids.length > 0 ? (
        props.homePosts.allPostUids.map((postUid) => (
        <Post
        postUid={postUid}
        />
        ))
      ) : (
        <div>no posts</div>
      )}
    </Container>
  );
};

function mapStatetoProps(state) {
  return {
    posts: state.posts,
    homePosts: state.homePosts
  };
}

export default connect(mapStatetoProps, { userAddPost })(Home);

{
  /* <Post
  backgroundImage={Drone}
  postUser={"charlie wilson"}
  postTitle={"Printable Drone"}
  postDescription={
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium a velit at vitae potenti consequat. Nec leo, gravida viverra augue ut tincidunt rutrum odio diam."
  }
  timestamp={12}
/>; */
}
