import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

const CommentSpacing = styled.div`
  padding-bottom: 10px;
  width: 100%;
  height: 100%;
`;
const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: rgba(142, 142, 142, 0.3);
  height: 75px;
  border-radius: 10px;
  padding: 25px;
  color: #ffffff;
`;

const Username = styled.div`
  font-size: 16px;
  font-family: proxima-nova;
  color: white;
  padding-bottom: 5px;
  font-weight: 500;
`;

const AvatarWrapper = styled.div`
  padding-right: 15px;
`;

const CommentContents = styled.div`
  font-size: 16px;
  font-family: proxima-nova;
  color: white;
  font-weight: normal;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Comment = (props) => {
  const commentAuthor = useSelector((state) => state.users.usersByUid[props.user_id]);
  return (
    <CommentSpacing>
      <Root>
        <AvatarWrapper>
          <Avatar size={50} />
        </AvatarWrapper>
        <UserInfoWrapper>
          <Username>{commentAuthor.username} </Username>
          <CommentContents>{props.content}</CommentContents>
        </UserInfoWrapper>
      </Root>
    </CommentSpacing>
  );
};

export default Comment;
