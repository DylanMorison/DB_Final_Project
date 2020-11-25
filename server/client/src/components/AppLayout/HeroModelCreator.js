import React from "react";
import Avatar from "../Avatar";
import styled from "styled-components";
import { connect, useSelector } from 'react-redux';
import { withRouter, Link, generatePath } from "react-router-dom";
import * as Routes from "routes";
import DownloadIcon from "../icons/DownloadIcon";


const AuthorContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding-top: 70px;
`;

const AvatarWrapper = styled.div`
  border: 4px solid #198FD2;
  border-radius: 50%;
`;

const AuthorNameWrapper = styled.div`
  display: flex;
  padding-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const AuthorName = styled.div`
  font-family: aktiv-grotesk;
  font-style: normal;
  font-weight: 500;
  font-size: 25.888px;
  color: #ffffff;
  padding-bottom: 10px;
`;

const PostType = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #ffffff;
`;

const DownloadIconWrapper = styled.div`
  font-family: Proxima Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  padding-left: 15px;
  color: #ffffff;
`;

export const HeroModelCreator = (props) => {
  const thisPost = useSelector(state => state.posts.postsByUids[props.topPost.topPostUid])
  const postAuthor = useSelector(state => state.users.usersByUid[thisPost.authorUid])

  return (
    <AuthorContent>
      <AvatarWrapper>
      <Link
        exact
        to={{
          pathname: generatePath(Routes.USER_PROFILE, {
            username: postAuthor.userUid,
          }),
          state: { auth: postAuthor.userUid },
        }}
      >
        <Avatar image={postAuthor.avatar} size={72} />
      </Link>
      </AvatarWrapper>
      <AuthorNameWrapper>
        <AuthorName>{postAuthor.username}</AuthorName>
        <PostType>{thisPost.title}</PostType>
      </AuthorNameWrapper>
      <DownloadIconWrapper> <a href={`${thisPost.file}`} target="_blank" download><DownloadIcon /></a></DownloadIconWrapper>
    </AuthorContent>
  );
};


function mapStatetoProps(state) {
  return {
    users: state.users,
    posts: state.posts,
    topPost: state.topPost,
  };
}

export default connect(mapStatetoProps)(withRouter(HeroModelCreator));


