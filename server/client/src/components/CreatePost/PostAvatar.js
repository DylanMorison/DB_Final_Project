import React from "react";
import { generatePath, withRouter, NavLink } from "react-router-dom";
import styled from "styled-components";
import Avatar from "components/Avatar";
import * as Routes from "routes";
import { useStore } from "store";
import exit from "../../img/exitIcon.svg";
import Default from "../../img/default-pic.png"

const Wrapper = styled.div`
  display: flex;
  width: 100%
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 35px;
`;
const exitIcon = styled.div`
  display: flex;
  width: 100%
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 35px;
`;

const AvatarWrapper = styled.div`
  padding-top: 25px;
`;

const PostAvatar = (props) => {

  return (
    <Wrapper>
      <img src={exit} alt="exit" onClick={props.buttonClick} />
      <AvatarWrapper><Avatar image={Default} size={150} /> </AvatarWrapper>
      
    </Wrapper>
  );
};

export default PostAvatar;
