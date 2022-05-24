import { configureStore } from "@reduxjs/toolkit";

import {
	mapReducer,
	sidebarReducer,
	topbarReducer,
	userReducer,
} from "./slices";

// const composeEnhancers =
// 	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default configureStore({
	reducer: {
		map: mapReducer,
		sidebar: sidebarReducer,
		topbar: topbarReducer,
		user: userReducer,
	},
});
