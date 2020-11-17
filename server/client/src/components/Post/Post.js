import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import UserSection from "./UserSection";
import Timestamp from "./Timestamp";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import CommentSection from "./CommentSection";
import { useSelector } from "react-redux";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes:center;
  padding-bottom: 35px;
  overflow-x:hidden:


`;
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes:center;
  width: 50vw;
  height: 375px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  box-shadow:inset 0 0 0 375px rgba(18,133,191,.3);
  

  @media (max-width: 1000px) {
    width: 85vw;
  }
  
  `;

const UpperSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 25px;
`;
const LowerSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

const Post = (props) => {
  const [commentsShown, setCommentsShown] = useState(false);
  const thisPost = useSelector(state => state.posts.postsByUids[props.postUid])
  const postAuthor = useSelector(state => state.users.usersByUid[thisPost.authorUid])

  


  const handleCommentSection = () => {
    if (commentsShown) {
      return <CommentSection postData={thisPost}  />;
    }
  };

  return (
    <Root>
      <PostContainer
        style={{ backgroundImage: `url(${thisPost.thumbnail})` }}
      >
        <UpperSection>
          <UserSection postAuthor={postAuthor} />
          <Timestamp postData={thisPost} timestamp={thisPost.timestamp} />
        </UpperSection>
        <LowerSection>
          <PostInfo
            postDescription={thisPost.description}
            postTitle={thisPost.title}
          />
          <PostInteractions postData={thisPost} commentsShown={commentsShown} setCommentsShown={setCommentsShown}/>
        </LowerSection>
      </PostContainer>
      {handleCommentSection()}
    </Root>
  );
};

export default Post;
