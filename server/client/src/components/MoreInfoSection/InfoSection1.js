import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import MoreInfo1 from "../../img/MoreInfo1.png";
import LandingPage3 from "../../img/LandingPage3.svg"
import styles from "./ServiceStyle.module.css";




const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x:hidden;
  align-items: center;
  background-image: url(${LandingPage3});
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  height: 60rem;
  width: 100%;
  background-color: #149bde;

`;

const Heading = styled.p`
  font-family: aktiv-grotesk, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 41.89px;
  line-height: 54px;

  color: #ffffff;

  @media (max-width: 415px) {
    margin: 16px;
    text-align: center;
  }
`;

const Paragraph = styled.p`
  font-family: proxima-nova, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  width: 500px;
  padding-bottom: 30px;

  @media (max-width: 500px) {
    margin: 16px;
    width: 80%;
  }
`;


export const InfoSection1 = () => {

const screenLarge = useMediaQuery("(min-width: 1100px)");
const screenSmall = useMediaQuery("(max-width: 1100px)");


const GetFlexDirection = () => {
  if (screenLarge) {
    return "row";
  } else if (screenSmall) {
    return "column";
  }
};

  return (
    <Root>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection= {GetFlexDirection()}
      >
        <Box>
          <img className={styles.container}  src={MoreInfo1} alt="more info" />{" "}
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Heading>Check this Stuff Out.</Heading>
          <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </Paragraph>
        </Box>
      </Box>
    </Root>
  );
};

export default InfoSection1;
