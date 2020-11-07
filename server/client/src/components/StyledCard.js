import { Slide } from 'material-auto-rotating-carousel';
import React from "react";
import ChangingTitle from "./App/Header/ChangingCard/ChangingTitle";
import ChangingSubtitle from "./App/Header/ChangingCard/ChangingSubtitle";


const { red } = require('@material-ui/core/colors');
const { withStyles } = require('@material-ui/core/styles');

const styles = {
  root: {
    height: 400,
    width: 300, 
    backgroundColor:'transparent'
  },
  media: {
  }
}
const StyledSlide = withStyles(styles)(Slide);

function StyledCard(props) {
  const { classes } = props;
  return (
<StyledSlide
  media={<img src= {props.image} />}
  title={<ChangingTitle/>}
  mediaBackgroundStyle={{ backgroundColor: props.mediaBg }}
  subtitle= {<ChangingSubtitle/>}
/>
  );
}


export default StyledCard;
