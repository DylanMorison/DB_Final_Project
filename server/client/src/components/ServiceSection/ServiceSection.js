import React from "react";
import ServiceCard from "./ServiceCard";
import ServiceCardMobile from "./ServiceCardMobile";
import LandingPage2 from "../../img/LandingPage2.svg";
import Service1 from "../../img/Service1.svg";
import Service2 from "../../img/Service2.svg";
import Service3 from "../../img/Service3.svg";

import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import styles from "./ServiceStyle.module.css";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${LandingPage2});
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  height: 60rem;
  width: 100%;
  background-color: #149bde;

  @media (max-width: 1315px) {
    display: flex;
    flex-direction: column;
    background-image: url(${LandingPage2});
    background-position: center; 
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 110rem;
    padding-bottom: 2rem;


  }

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
    text-align:center;
    
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
    width: 80%
    
    
  }
  
`;

export const ServiceSection = () => {
  const screenLarge = useMediaQuery("(min-width: 1315px)");
  const screenSmall = useMediaQuery("(max-width: 1315px)");

  const isMobile = useMediaQuery("(max-width: 430px)");

  const GetFlexDirection = () => {
    if (screenLarge) {
      return "row";
    } else if (screenSmall) {
      return "column";
    }
  };

  const GetCardType = (props) => {
    if (isMobile) {
      return (
        <>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCardMobile
                className={styles.card}
                image={Service1}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCardMobile>
            </div>
          </Box>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCardMobile
                image={Service2}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCardMobile>
            </div>
          </Box>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCardMobile
                image={Service3}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCardMobile>
            </div>
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCard
                className={styles.card}
                image={Service1}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCard>
            </div>
          </Box>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCard
                image={Service2}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCard>
            </div>
          </Box>
          <Box p={4}>
            <div className={styles.container}>
              <ServiceCard
                image={Service3}
                title={"Lorem Ipsum"}
                subtitle={"lorem ipsum iore"}
                mediaBg={"transparent"}
              ></ServiceCard>
            </div>
          </Box>
        </>
      );
    }
  };

  return (
    <Root>
      <Heading>Check this Stuff Out.</Heading>
      <Paragraph>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.{" "}
      </Paragraph>

      <Box
        flexDirection={GetFlexDirection()}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        display="flex"
      >
        {GetCardType()}
      </Box>
    </Root>
  );
};

export default ServiceSection;
