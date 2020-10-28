import React, { useState } from "react";

import styled from "styled-components";

import Avatar from "components/Avatar";

import PostIcon from "../../img/PostIcon.svg";

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: white;
`;
const Button = styled.button`
  height: 40px;
  width: 120px;
  border-radius: 54px;
  border: none;
  margin-left: 20px;
  background: #056696;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CreateUnfocused = (props) => {
  return (
    <Root onClick={props.buttonClick}>
      <Wrapper>
        <img alt="x" src={PostIcon} />
        <Button>create a post</Button>
      </Wrapper>
    </Root>
  );
};

export default CreateUnfocused;
