import { configureStore } from "@reduxjs/toolkit";

import {
	mapReducer,
	sidebarReducer,
	topbarReducer,
	userReducer,
	markerReducer,
	trackReducer,
	routeReducer,
} from "./slices";

export default configureStore({
	reducer: {
		map: mapReducer,
		sidebar: sidebarReducer,
		marker: markerReducer,
		track: trackReducer,
		route: routeReducer,
		topbar: topbarReducer,
		user: userReducer,
	},
});
