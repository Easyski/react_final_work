import { configureStore } from "@reduxjs/toolkit";

import { mapReducer, editorReducer, sidebarReducer } from "./slices";

// const composeEnhancers =
// 	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default configureStore({
	reducer: {
		map: mapReducer,
		editor: editorReducer,
		sidebar: sidebarReducer,
	},
});
