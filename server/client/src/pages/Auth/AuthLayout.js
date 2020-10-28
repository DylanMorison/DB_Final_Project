import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";


import { AuthHeader, SignUp } from "pages/Auth";

import * as Routes from "routes";

import LandingVector2 from "../../img/LandingVector2.svg";





import ServiceSection from "../../components/ServiceSection/ServiceSection";
import MoreInfoSection from "../../components/MoreInfoSection/MoreInfoSection";


const Root = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  z-index: ${(p) => p.theme.zIndex.lg};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  grid-area: c;

  @media (min-width: ${(p) => p.theme.screen.md}) {
    justify-content: center;
  }


  @media (max-width: 400px) {
    padding-bottom: 35px;
  }
`;

const Pages = styled.div`

  @media (max-width: 1250px) {
    margin-top: 50px;
  }
`;


const Grid = styled.div`
  @media (max-width: 1250px) {
    display: grid;
    width: 100%;
    background-color: #149bde;
    height: 110%;
    grid-template-columns: auto;
    grid-template-rows: auto;
    justify-content: center;
    grid-template-areas:
      ".   c   c   c   c   c"
      ".   c   c   c   c   c"
      ".   c   c   c   c   c"
      ".   c   c   c   c   c"
      ".   c   c   c   c   c"
      ".   c   c   c   c   c"
      ".   .   .   .   .   ."
      ".   .   .   .   .   .";
  }

  display: grid;
  width: 100%;
  height: 100vh;
  background-color: #149bde;
  background-image: url(${LandingVector2});
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  grid-template-areas:
    "c   c   c   c   c   c"
    "c   c   c   c   c   c"
    "c   c   c   c   c   c"
    "c   c   c   c   c   c"
    "c   c   c   c   c   c"
    "c   c   c   c   c   c"
    ".   .   .   .   .   ."
    ".   .   .   .   .   .";
`;

/**
 * Main Layout for the app, when user isn't authenticated
 */
const AuthLayout = () => {
  return (
    <Root>
      <Grid>
        <Container>
          <AuthHeader/>
          <Pages>
            <Switch>
              <Route
                exact
                path={Routes.HOME}
                render={() => <SignUp />}
              />
              <Redirect to={Routes.HOME} />
            </Switch>
          </Pages>
        </Container>
      </Grid>
      <ServiceSection></ServiceSection>
      <MoreInfoSection></MoreInfoSection>
    </Root>
  );
};


export default AuthLayout;
