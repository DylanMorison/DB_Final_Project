import { Slide } from 'material-auto-rotating-carousel';
import React from "react";

const { withStyles } = require('@material-ui/core/styles');

const styles = {
  root: {
    height: 400,
    width: 300, 
    backgroundColor:'transparent',

  },
  media: {
  }
}
const StyledSlide = withStyles(styles)(Slide);

function ServiceCard(props) {
  //const { classes } = props;    code to use props from css module file 
  return (
<StyledSlide
  media={<img src= {props.image} alt="service item" />}
  title={props.title}
  mediaBackgroundStyle={{ backgroundColor: props.mediaBg }}
  subtitle= {props.subtitle}
/>
  );
}


export default ServiceCard;


