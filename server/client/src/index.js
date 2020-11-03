import React from "react";
import { render } from "react-dom";
import { ThemeProvider } from "styled-components";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react'


import "normalize.css";
import theme from "theme";

import App from "components/App/App";
window.axios = axios;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


const store = createStore(
	persistedReducer,
	{},
	composeWithDevTools(applyMiddleware(reduxThunk, logger))
);

let persistor = persistStore(store)




render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
			</PersistGate>

		</Provider>
	</ThemeProvider>,
	document.getElementById("root")
);

