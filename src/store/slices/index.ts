export { setNewMarkers, default as sidebarReducer } from "./sidebarSlice";

export {
	setCenterCoordinates,
	setZoom,
	setLocationName,
	default as mapReducer,
} from "./mapSlice";

export {
	setEmail,
	setUid,
	setLoggedIn,
	default as userReducer,
} from "./userSlice";

export { setLocations, setMode, default as topbarReducer } from "./topbarSlice";
