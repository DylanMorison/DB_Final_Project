import React, { useState } from "react";
import styled from "styled-components";

import { A } from "components/Text";


import { connect } from "react-redux";
import Post from "../../components/Post/Post"

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
 * Explore page
 */
const Explore = (props) => {

  return (
    <Container maxWidth="sm">
      <Spacing />
      {props.explorePosts.allPostUids.length > 0 ? (
        props.explorePosts.allPostUids.map((postUid) => (
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
    explorePosts: state.explorePosts
  };
}

export default connect(mapStatetoProps)(Explore);

