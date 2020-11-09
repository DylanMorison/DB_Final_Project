import React, { useState, lazy, Suspense, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyles';

import AuthLayout from 'pages/Auth/AuthLayout';
import AppLayout from '../AppLayout/AppLayout';
import ScrollToTop from './ScrollToTop';
import useUser from "../../hooks/useUser"
import { connect } from "react-redux";
/**
 * Root component of the app
 */
const App = (props) => {
  const [currentUser, setCurrentUser] = useState();
  useUser(setCurrentUser);
//check in sql databse if user exists
  return (
    <Router>
      <GlobalStyle />

      <ScrollToTop>
        <Switch>
          {props.auth.userUid ? (
            <Route
              exact
              render={() => <AppLayout />}
            />
          ) : (
            <Route exact render={() => <AuthLayout />} />
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStatetoProps)(App);





//<ScrollToTop>

//<Route exact render={() => <AuthLayout refetch={refetch} />} />

//</ScrollToTop>