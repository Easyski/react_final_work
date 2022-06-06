import { configureStore } from "@reduxjs/toolkit";

import {
	mapReducer,
	sidebarReducer,
	topbarReducer,
	userReducer,
} from "./slices";

export default configureStore({
	reducer: {
		map: mapReducer,
		sidebar: sidebarReducer,
		topbar: topbarReducer,
		user: userReducer,
	},
});
