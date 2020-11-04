import React, { useState } from "react";

import styled from "styled-components";

import Avatar from "components/Avatar";
import Button from "@material-ui/core/Button";
import PostIcon from "../../img/PostIcon.svg";
import { makeStyles } from "@material-ui/core/styles";

const Root = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  cursor: pointer;
`;


const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const useStyles = makeStyles({
  root: {
    background: "#056696",
    border: 0,
    height: "40px",
    width: '120px',
    borderRadius: "54px",
    boxShadow: "0 3px 5px 2px rgba(8, 93, 132, .3)",
    color: "white",
    border: "none",
    marginLeft: "20px", 
    cursor: "pointer",
    textTransform: "none",
    "&:hover": {
    backgroundColor: "#02ABFF",
    color: "#fff"
    }
  },
});




const CreateUnfocused = (props) => {
  const classes = useStyles();
  return (
    <Root onClick={props.buttonClick}>
      <Wrapper>
        <img alt="x" src={PostIcon} />

        <Button className={classes.root}>Create a post</Button>
      </Wrapper>
    </Root>
  );
};

export default CreateUnfocused;
