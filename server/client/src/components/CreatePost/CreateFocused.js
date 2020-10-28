import React, { useState } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import Box from "@material-ui/core/Box";



import PostPopup from "./PostPopup";

const Root = styled.div`
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  
`;



const CreateFocused = (props) => {
  return (
    <Root >
      <PostPopup buttonClick={props.buttonClick}/>
    </Root>
  );
};

export default CreateFocused;
