import React, { useState } from "react";
import styled from "styled-components";
import CommentIcon from "../icons/CommentIcon";
import FavoritedIcon from "../icons/FavoritedIcon";
import NonFavoritedIcon from "../icons/NonFavoritedIcon";
import { deleteLike, addLike } from "../../actions";
import { connect }  from "react-redux";

const InteractionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Number = styled.div`
  font-family: aktiv-grotesk;
  font-weight: 500;
  font-size: 25.888px;
  padding-right: 5px;
`;

const PostInteractions = (props) => {
  const [liked, setLiked] = useState(props.postData.usersLiked.includes(props.auth.userUid));
  const [numLikes, setNumLikes] = useState(0);
  const [numComments, setNumComments] = useState(5);

  const handleDisplayIcon = () => {
    if (liked) {
      return <FavoritedIcon />;
    } else {
      return <NonFavoritedIcon />;
    }
  };

  const handleLike = () => {
    if (props.postData.usersLiked.includes(props.auth.userUid)) {
      props.deleteLike(props.auth.userUid, props.postData.postUid);
      setLiked(!liked);
    }
    else{
     props.addLike(props.auth.userUid, props.postData.postUid)
      setLiked(!liked);
    }
    
  };

  const handleShowComments = () => {
    props.setCommentsShown(!props.commentsShown)
  };

  return (
    <InteractionWrapper>
      <LikeWrapper onClick={handleLike}><Number>{props.postData.usersLiked.length}</Number> {handleDisplayIcon()}</LikeWrapper>
      <CommentWrapper onClick={handleShowComments}>
        <Number>{props.postData.comments.length}</Number>
        <CommentIcon />
      </CommentWrapper>
    </InteractionWrapper>
  );
};



function mapStatetoProps(state) {
  return {
    posts: state.posts,
    auth: state.auth
  };
}

export default connect(mapStatetoProps, { deleteLike, addLike })(PostInteractions);