import React from "react";
import styled from "styled-components";

import Box from "@material-ui/core/Box";

import printer from "../img/3dprinter.png";

const AboutSectionbg = styled.div`
  background-color: #013a6b;
  background-image: -webkit-linear-gradient(100deg, #001a39 75%, #005c93 25%);
  height: 100vh;
  width: 100%;

  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  grid-template-areas:
    "fw  fw  fw fw  fw  fw"
    "fw  fw  fw fw  fw  fw"
    "fw  fw  fw fw  fw  fw"
    "fw  fw  fw fw  fw  fw"
    "fw  fw  fw fw  fw  fw"
    "fw  fw  fw fw  fw  fw"
    ".   .   .   .   .   .";
`;

const PrinterImg = styled.div`
  height: 50%;
  width: 50%;
`;

const PrinterText = styled.div`
  height: 100%;
  width: 90%;
  color: white;
`;

const FlexWrapper = styled.div`
  grid-area: fw;

`;

/**
 * Component for landing about 3d vation section
 */
const AboutSection = () => (
  <AboutSectionbg>
    <Box alignItems="center" justifyItems="center" display="flex" flexDirection="row" p={1} m={1}>
      <Box>
        <PrinterImg>
          <img src={printer} alt="Logo" />
        </PrinterImg>
      </Box>

      <Box>
        <PrinterText>
          <p>
            Lorem ipsum dolor sit amet, eos te magna diceret voluptua, est at
            sale aeque consequat, consul senserit tractatos nec no. Aliquip
            diceret forensibus in sed, sit id timeam facilis alienum. No duo
            decore causae consequuntur. Eos altera causae ei. Ut tantas numquam
            per, mei sint deserunt invenire ne. Usu omittam accusata
            disputationi ad. Est scaevola detraxit eu, wisi sensibus ocurreret
            mea cu.
          </p>
        </PrinterText>
      </Box>
    </Box>
  </AboutSectionbg>
);

export default AboutSection;
