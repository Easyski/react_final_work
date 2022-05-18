import { configureStore } from "@reduxjs/toolkit";

import mapReducer from "./slices/mapSlice";
import editorReducer from "./slices/editorSlice";
import sidebarReducer from "./slices/sidebarSlice";

// const composeEnhancers =
// 	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default configureStore({
	reducer: {
		map: mapReducer,
		editor: editorReducer,
		sidebar: sidebarReducer,
	},
});
