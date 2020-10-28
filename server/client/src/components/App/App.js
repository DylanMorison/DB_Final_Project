import React, { useState, lazy, Suspense, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from './GlobalStyles';

import AuthLayout from 'pages/Auth/AuthLayout';
import AppLayout from '../AppLayout/AppLayout';
import ScrollToTop from './ScrollToTop';
import useUser from "../../hooks/useUser"

/**
 * Root component of the app
 */
const App = () => {
  const [currentUser, setCurrentUser] = useState();
  useUser(setCurrentUser);
//NEW ^^
  return (
    <Router>
      <GlobalStyle />

      <ScrollToTop>
        <Switch>
          {currentUser  ? (
            <Route
              exact
              render={() => <AppLayout authUser={currentUser} />}
            />
          ) : (
            <Route exact render={() => <AuthLayout />} />
          )}
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;



//<ScrollToTop>

//<Route exact render={() => <AuthLayout refetch={refetch} />} />

//</ScrollToTop>