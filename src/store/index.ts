import { compose, configureStore } from "@reduxjs/toolkit";

import mapReducer from "./slices/mapSlice";

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default configureStore({
	reducer: {
		map: mapReducer,
	},
});
