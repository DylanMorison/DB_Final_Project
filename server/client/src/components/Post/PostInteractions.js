import React, { useState } from "react";
import styled from "styled-components";
import CommentIcon from "../icons/CommentIcon";
import FavoritedIcon from "../icons/FavoritedIcon";
import NonFavoritedIcon from "../icons/NonFavoritedIcon";
import { userToggleLike } from "../../actions";
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
  const [liked, setLiked] = useState(props.postData.usersLiked.includes(props.auth.uid));
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
    if (props.postData.usersLiked.includes(props.auth.uid)) {
      props.postData.numLikes -= 1;
      props.postData.usersLiked =  props.postData.usersLiked.filter(user => user.uid !== props.auth.uid);
      props.userToggleLike(props.postData, props.auth);
      setLiked(!liked);
    }
    else{
      props.postData.numLikes += 1;
      props.postData.usersLiked.push(props.auth.uid);
      props.userToggleLike(props.postData, props.auth);
      setLiked(!liked);
    }
    
  };

  const handleShowComments = () => {
    props.setCommentsShown(!props.commentsShown)
  };

  return (
    <InteractionWrapper>
      <LikeWrapper onClick={handleLike}><Number>{props.postData.numLikes}</Number> {handleDisplayIcon()}</LikeWrapper>
      <CommentWrapper onClick={handleShowComments}>
        <Number>{props.postData.numComments}</Number>
        <CommentIcon />
      </CommentWrapper>
    </InteractionWrapper>
  );
};



function mapStatetoProps(state) {
  return {
    homePosts: state.homePosts,
    auth: state.auth
  };
}

export default connect(mapStatetoProps, { userToggleLike })(PostInteractions);