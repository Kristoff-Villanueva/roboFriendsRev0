import React from "react";
// import ReactDOM from 'react-dom'; The new way to import createRoot:
import { createRoot } from "react-dom/client";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import "./index.css";
import App from "./containers/App";
import "tachyons";
import { Provider } from "react-redux";
import {
	legacy_createStore as createStore,
	applyMiddleware,
	combineReducers,
} from "redux";
import { searchRobots, requestRobots } from "./reducers";
// import registerServiceWorker from './registerServiceWorker';

const logger = createLogger();
const rootReducer = combineReducers({ searchRobots, requestRobots });

const store = createStore(
	rootReducer,
	applyMiddleware(thunkMiddleware, logger)
);

const root = createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
