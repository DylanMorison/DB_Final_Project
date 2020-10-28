import { Slide } from "material-auto-rotating-carousel";
import React from "react";
import styled, { css } from "styled-components";

import styles1 from "./ServiceStyle.module.css";

const { red } = require("@material-ui/core/colors");
const { withStyles } = require("@material-ui/core/styles");

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-family: aktiv-grotesk;
  font-weight: bold;
  font-size: 26.6724px;
  color: white;
  text-align: center;
`;

const styles = {
  root: {
    backgroundColor: "transparent",
  },
  media: {
    fontSize: "2px",
  },
};
const StyledSlide = withStyles(styles)(Slide);

function StyledCard(props) {
  const { classes } = props;
  return (
    <Root>
      <StyledSlide
        media={<img src={props.image} />}
        title={props.title}
        mediaBackgroundStyle={{ backgroundColor: props.mediaBg }}
        subtitle={props.subtitle}
      />
      <Title>100+ 3D designs</Title>
    </Root>
  );
}

export default StyledCard;
