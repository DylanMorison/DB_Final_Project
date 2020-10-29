import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { StoreProvider } from "store";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

import "normalize.css";
import theme from "theme";

import App from "components/App/App";
window.axios = axios;

const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(reduxThunk, logger))
);

render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</ThemeProvider>,
	document.getElementById("root")
);
